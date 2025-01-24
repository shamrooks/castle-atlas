import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { progressService } from '../services/progressService';
import { useAuth } from './AuthContext';

// Define action types
const ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  UPDATE_PROGRESS: 'UPDATE_PROGRESS',
  UPDATE_SKILL_PROGRESS: 'UPDATE_SKILL_PROGRESS',
  SET_STREAK: 'SET_STREAK',
  UPDATE_ACHIEVEMENTS: 'UPDATE_ACHIEVEMENTS',
  RESET_STATE: 'RESET_STATE'
};

// Initial state
const initialState = {
  loading: false,
  error: null,
  overallProgress: 0,
  skillProgress: {},
  currentStreak: 0,
  achievements: [],
  lastUpdated: null
};

// Reducer function
function progressReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload, error: null };
    
    case ACTIONS.SET_ERROR:
      return { ...state, error: action.payload, loading: false };
    
    case ACTIONS.UPDATE_PROGRESS:
      return {
        ...state,
        overallProgress: action.payload,
        lastUpdated: new Date().toISOString()
      };
    
    case ACTIONS.UPDATE_SKILL_PROGRESS:
      return {
        ...state,
        skillProgress: {
          ...state.skillProgress,
          [action.payload.skillId]: action.payload.progress
        },
        lastUpdated: new Date().toISOString()
      };
    
    case ACTIONS.SET_STREAK:
      return { ...state, currentStreak: action.payload };
    
    case ACTIONS.UPDATE_ACHIEVEMENTS:
      return { ...state, achievements: action.payload };
    
    case ACTIONS.RESET_STATE:
      return initialState;
    
    default:
      return state;
  }
}

// Create context
const ProgressContext = createContext(null);

// Provider component
export const ProgressProvider = ({ children }) => {
  const [state, dispatch] = useReducer(progressReducer, initialState);
  const { user } = useAuth();

  // Fetch overall progress
  const fetchProgress = useCallback(async () => {
    if (!user) return;

    dispatch({ type: ACTIONS.SET_LOADING, payload: true });
    try {
      const progress = await progressService.getOverallProgress(user.id);
      dispatch({ type: ACTIONS.UPDATE_PROGRESS, payload: progress });
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
    }
  }, [user]);

  // Update skill progress
  const updateSkillProgress = useCallback(async (skillId, progress) => {
    if (!user) return;

    dispatch({ type: ACTIONS.SET_LOADING, payload: true });
    try {
      await progressService.updateSkillProgress(user.id, skillId, { progress });
      dispatch({
        type: ACTIONS.UPDATE_SKILL_PROGRESS,
        payload: { skillId, progress }
      });
      
      // Fetch updated overall progress
      await fetchProgress();
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
    }
  }, [user, fetchProgress]);

  // Get current streak
  const fetchStreak = useCallback(async () => {
    if (!user) return;

    try {
      const streak = await progressService.getCurrentStreak(user.id);
      dispatch({ type: ACTIONS.SET_STREAK, payload: streak });
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
    }
  }, [user]);

  // Update achievements
  const fetchAchievements = useCallback(async () => {
    if (!user) return;

    try {
      const achievements = await progressService.getUserAchievements(user.id);
      dispatch({ type: ACTIONS.UPDATE_ACHIEVEMENTS, payload: achievements });
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
    }
  }, [user]);

  // Reset progress state
  const resetProgress = useCallback(() => {
    dispatch({ type: ACTIONS.RESET_STATE });
  }, []);

  const value = {
    ...state,
    fetchProgress,
    updateSkillProgress,
    fetchStreak,
    fetchAchievements,
    resetProgress
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
};

// Custom hook
export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (context === null) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};

// Export context for direct usage if needed
export { ProgressContext, ACTIONS };