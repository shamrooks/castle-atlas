// API Configuration
export const API_CONFIG = {
    BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:3000/api',
    TIMEOUT: 30000,
    VERSION: 'v1',
  };
  
  // Authentication
  export const AUTH_CONSTANTS = {
    TOKEN_KEY: 'authToken',
    REFRESH_TOKEN_KEY: 'refreshToken',
    SESSION_TIMEOUT: 3600000, // 1 hour
    MINIMUM_PASSWORD_LENGTH: 8,
  };
  
  // Routes
  export const ROUTES = {
    HOME: '/',
    LOGIN: '/login',
    REGISTER: '/register',
    DASHBOARD: '/dashboard',
    PROFILE: '/profile',
    SKILLS: '/skills',
    SETTINGS: '/settings',
    ABOUT: '/about',
    PRICING: '/pricing',
    FAQ: '/faq',
  };
  
  // Skill Levels
  export const SKILL_LEVELS = {
    BEGINNER: 'Beginner',
    INTERMEDIATE: 'Intermediate',
    ADVANCED: 'Advanced',
    EXPERT: 'Expert',
  };
  
  // Learning Paths
  export const LEARNING_PATHS = {
    FRONTEND: 'frontend',
    BACKEND: 'backend',
    FULLSTACK: 'fullstack',
    DATA_SCIENCE: 'data-science',
    MOBILE: 'mobile',
    DEVOPS: 'devops',
  };
  
  // Achievement Types
  export const ACHIEVEMENT_TYPES = {
    SKILL_COMPLETION: 'skill_completion',
    STREAK_MILESTONE: 'streak_milestone',
    QUIZ_PERFECT: 'quiz_perfect',
    FIRST_CONTRIBUTION: 'first_contribution',
  };
  
  // UI Constants
  export const UI_CONSTANTS = {
    MOBILE_BREAKPOINT: 768,
    TABLET_BREAKPOINT: 1024,
    DESKTOP_BREAKPOINT: 1280,
    ANIMATION_DURATION: 300,
    TOAST_DURATION: 5000,
    MAX_FILE_SIZE: 5242880, // 5MB
  };
  
  // Error Messages
  export const ERROR_MESSAGES = {
    NETWORK_ERROR: 'Network error. Please check your connection.',
    UNAUTHORIZED: 'You are not authorized to perform this action.',
    SESSION_EXPIRED: 'Your session has expired. Please log in again.',
    INVALID_CREDENTIALS: 'Invalid email or password.',
    REQUIRED_FIELD: 'This field is required.',
    INVALID_EMAIL: 'Please enter a valid email address.',
    PASSWORD_TOO_SHORT: `Password must be at least ${AUTH_CONSTANTS.MINIMUM_PASSWORD_LENGTH} characters.`,
    PASSWORDS_DO_NOT_MATCH: 'Passwords do not match.',
    FILE_TOO_LARGE: 'File size exceeds the maximum limit.',
  };
  
  // Success Messages
  export const SUCCESS_MESSAGES = {
    LOGIN_SUCCESS: 'Successfully logged in.',
    REGISTER_SUCCESS: 'Registration successful.',
    PROFILE_UPDATED: 'Profile updated successfully.',
    PASSWORD_CHANGED: 'Password changed successfully.',
    SKILL_COMPLETED: 'Congratulations! Skill completed.',
  };
  
  // Date Formats
  export const DATE_FORMATS = {
    DISPLAY: 'MMM DD, YYYY',
    DATABASE: 'YYYY-MM-DD',
    TIMESTAMP: 'YYYY-MM-DD HH:mm:ss',
  };
  
  // Analytics Events
  export const ANALYTICS_EVENTS = {
    USER_SIGNUP: 'user_signup',
    USER_LOGIN: 'user_login',
    SKILL_START: 'skill_start',
    SKILL_COMPLETE: 'skill_complete',
    ACHIEVEMENT_EARNED: 'achievement_earned',
    SUBSCRIPTION_STARTED: 'subscription_started',
  };
  
  // Cache Duration (in milliseconds)
  export const CACHE_DURATION = {
    SHORT: 300000, // 5 minutes
    MEDIUM: 3600000, // 1 hour
    LONG: 86400000, // 24 hours
  };
  
  // HTTP Status Codes
  export const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    SERVER_ERROR: 500,
  };