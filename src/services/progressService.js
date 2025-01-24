import { apiService } from './api';

class ProgressService {
  // Overall progress tracking
  async getOverallProgress(userId) {
    return apiService.get(`/progress/${userId}/overall`);
  }

  async getProgressHistory(userId, startDate, endDate) {
    return apiService.get(
      `/progress/${userId}/history?start=${startDate}&end=${endDate}`
    );
  }

  // Skill-specific progress
  async getSkillProgress(userId, skillId) {
    return apiService.get(`/progress/${userId}/skills/${skillId}`);
  }

  async updateSkillProgress(userId, skillId, progressData) {
    return apiService.put(
      `/progress/${userId}/skills/${skillId}`,
      progressData
    );
  }

  // Learning path progress
  async getPathProgress(userId, pathId) {
    return apiService.get(`/progress/${userId}/paths/${pathId}`);
  }

  async updatePathProgress(userId, pathId, progressData) {
    return apiService.put(
      `/progress/${userId}/paths/${pathId}`,
      progressData
    );
  }

  // Module progress
  async getModuleProgress(userId, moduleId) {
    return apiService.get(`/progress/${userId}/modules/${moduleId}`);
  }

  async updateModuleProgress(userId, moduleId, progressData) {
    return apiService.put(
      `/progress/${userId}/modules/${moduleId}`,
      progressData
    );
  }

  // Learning streaks
  async getCurrentStreak(userId) {
    return apiService.get(`/progress/${userId}/streak`);
  }

  async getLongestStreak(userId) {
    return apiService.get(`/progress/${userId}/streak/longest`);
  }

  // Time tracking
  async getTimeSpent(userId, timeframe = 'all') {
    return apiService.get(`/progress/${userId}/time?timeframe=${timeframe}`);
  }

  async logTimeSpent(userId, activityData) {
    return apiService.post(`/progress/${userId}/time`, activityData);
  }

  // Assessment results
  async getAssessmentResults(userId, skillId) {
    return apiService.get(
      `/progress/${userId}/assessments/${skillId}`
    );
  }

  async saveAssessmentResult(userId, skillId, resultData) {
    return apiService.post(
      `/progress/${userId}/assessments/${skillId}`,
      resultData
    );
  }

  // Progress analytics
  async getProgressAnalytics(userId, metrics = []) {
    return apiService.get(
      `/progress/${userId}/analytics?metrics=${metrics.join(',')}`
    );
  }

  async getWeakAreas(userId) {
    return apiService.get(`/progress/${userId}/weak-areas`);
  }

  async getStrengths(userId) {
    return apiService.get(`/progress/${userId}/strengths`);
  }

  // Progress reports
  async generateProgressReport(userId, options) {
    return apiService.post(
      `/progress/${userId}/report`,
      options
    );
  }

  async getProgressReports(userId) {
    return apiService.get(`/progress/${userId}/reports`);
  }

  // Goals and milestones
  async setLearningGoal(userId, goalData) {
    return apiService.post(`/progress/${userId}/goals`, goalData);
  }

  async updateGoalProgress(userId, goalId, progressData) {
    return apiService.put(
      `/progress/${userId}/goals/${goalId}`,
      progressData
    );
  }

  async getMilestones(userId) {
    return apiService.get(`/progress/${userId}/milestones`);
  }

  async updateMilestone(userId, milestoneId, milestoneData) {
    return apiService.put(
      `/progress/${userId}/milestones/${milestoneId}`,
      milestoneData
    );
  }

  // Competency tracking
  async getCompetencyLevels(userId) {
    return apiService.get(`/progress/${userId}/competencies`);
  }

  async updateCompetencyLevel(userId, competencyId, levelData) {
    return apiService.put(
      `/progress/${userId}/competencies/${competencyId}`,
      levelData
    );
  }

  // Learning velocity
  async getLearningVelocity(userId, period = '30d') {
    return apiService.get(`/progress/${userId}/velocity?period=${period}`);
  }

  // Progress comparisons
  async getPeerComparison(userId, skillId) {
    return apiService.get(`/progress/${userId}/comparison/peers/${skillId}`);
  }

  async getAverageProgress(skillId) {
    return apiService.get(`/progress/average/${skillId}`);
  }

  // Progress exports
  async exportProgress(userId, format = 'pdf', dateRange = {}) {
    return apiService.get(
      `/progress/${userId}/export?format=${format}&startDate=${dateRange.start}&endDate=${dateRange.end}`,
      { responseType: 'blob' }
    );
  }
}

export const progressService = new ProgressService();