import { apiService } from './api';

class SkillsService {
  async getAllSkills() {
    return apiService.get('/skills');
  }

  async getSkillById(skillId) {
    return apiService.get(`/skills/${skillId}`);
  }

  async getSkillTree(path = 'frontend') {
    return apiService.get(`/skills/tree/${path}`);
  }

  async getLearningPath(pathId) {
    return apiService.get(`/skills/path/${pathId}`);
  }

  async getAllLearningPaths() {
    return apiService.get('/skills/paths');
  }

  async startSkill(skillId) {
    return apiService.post(`/skills/${skillId}/start`);
  }

  async updateSkillProgress(skillId, progress) {
    return apiService.put(`/skills/${skillId}/progress`, { progress });
  }

  async completeSkill(skillId) {
    return apiService.post(`/skills/${skillId}/complete`);
  }

  async getPrerequisites(skillId) {
    return apiService.get(`/skills/${skillId}/prerequisites`);
  }

  async getNextRecommendedSkills(userId) {
    return apiService.get(`/skills/recommendations/${userId}`);
  }

  // Module-related methods
  async getModuleContent(moduleId) {
    return apiService.get(`/modules/${moduleId}`);
  }

  async startModule(moduleId) {
    return apiService.post(`/modules/${moduleId}/start`);
  }

  async updateModuleProgress(moduleId, progress) {
    return apiService.put(`/modules/${moduleId}/progress`, { progress });
  }

  async completeModule(moduleId) {
    return apiService.post(`/modules/${moduleId}/complete`);
  }

  // Assessment-related methods
  async startAssessment(skillId) {
    return apiService.post(`/skills/${skillId}/assessment/start`);
  }

  async submitAssessment(skillId, answers) {
    return apiService.post(`/skills/${skillId}/assessment/submit`, { answers });
  }

  // Resource-related methods
  async getSkillResources(skillId) {
    return apiService.get(`/skills/${skillId}/resources`);
  }

  async submitResourceRating(resourceId, rating) {
    return apiService.post(`/resources/${resourceId}/rate`, { rating });
  }

  // Achievement-related methods
  async getSkillAchievements(skillId) {
    return apiService.get(`/skills/${skillId}/achievements`);
  }

  async claimAchievement(achievementId) {
    return apiService.post(`/achievements/${achievementId}/claim`);
  }
}

export const skillsService = new SkillsService();