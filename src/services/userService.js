import { apiService } from './api';

class UserService {
  // Profile management
  async getUserProfile(userId) {
    return apiService.get(`/users/${userId}`);
  }

  async updateUserProfile(userId, profileData) {
    return apiService.put(`/users/${userId}`, profileData);
  }

  async updateAvatar(userId, file, onProgress) {
    return apiService.uploadFile(`/users/${userId}/avatar`, file, onProgress);
  }

  // Settings management
  async getUserSettings(userId) {
    return apiService.get(`/users/${userId}/settings`);
  }

  async updateUserSettings(userId, settings) {
    return apiService.put(`/users/${userId}/settings`, settings);
  }

  // Learning preferences
  async getLearningPreferences(userId) {
    return apiService.get(`/users/${userId}/preferences`);
  }

  async updateLearningPreferences(userId, preferences) {
    return apiService.put(`/users/${userId}/preferences`, preferences);
  }

  // Activity tracking
  async getUserActivity(userId, startDate, endDate) {
    return apiService.get(
      `/users/${userId}/activity?start=${startDate}&end=${endDate}`
    );
  }

  async logUserActivity(userId, activityData) {
    return apiService.post(`/users/${userId}/activity`, activityData);
  }

  // Notifications
  async getUserNotifications(userId) {
    return apiService.get(`/users/${userId}/notifications`);
  }

  async updateNotificationSettings(userId, settings) {
    return apiService.put(`/users/${userId}/notifications/settings`, settings);
  }

  async markNotificationAsRead(userId, notificationId) {
    return apiService.put(
      `/users/${userId}/notifications/${notificationId}/read`
    );
  }

  // Social features
  async getUserConnections(userId) {
    return apiService.get(`/users/${userId}/connections`);
  }

  async sendConnectionRequest(userId, targetUserId) {
    return apiService.post(`/users/${userId}/connections`, { targetUserId });
  }

  async acceptConnectionRequest(userId, requestId) {
    return apiService.put(
      `/users/${userId}/connections/${requestId}/accept`
    );
  }

  // Achievements and badges
  async getUserAchievements(userId) {
    return apiService.get(`/users/${userId}/achievements`);
  }

  async getUserBadges(userId) {
    return apiService.get(`/users/${userId}/badges`);
  }

  // Learning stats
  async getUserStats(userId) {
    return apiService.get(`/users/${userId}/stats`);
  }

  async getUserLeaderboardPosition(userId) {
    return apiService.get(`/users/${userId}/leaderboard`);
  }

  // Account management
  async changePassword(userId, passwordData) {
    return apiService.put(`/users/${userId}/password`, passwordData);
  }

  async updateEmailPreferences(userId, preferences) {
    return apiService.put(`/users/${userId}/email-preferences`, preferences);
  }

  async deleteAccount(userId, reason) {
    return apiService.delete(`/users/${userId}`, { reason });
  }

  // Session management
  async getUserSessions(userId) {
    return apiService.get(`/users/${userId}/sessions`);
  }

  async revokeSession(userId, sessionId) {
    return apiService.delete(`/users/${userId}/sessions/${sessionId}`);
  }
}

export const userService = new UserService();