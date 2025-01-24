// Constants for local storage keys
const TOKEN_KEY = 'castle_atlas_token';
const USER_KEY = 'castle_atlas_user';

class AuthService {
  constructor() {
    this.token = localStorage.getItem(TOKEN_KEY);
    this.user = JSON.parse(localStorage.getItem(USER_KEY));
    // Base API URL - replace with your actual API endpoint
    this.apiUrl = 'https://api.castleatlas.com';
  }

  // Login function
  async login(email, password) {
    try {
      // In a real app, this would be an API call
      const response = await fetch(`${this.apiUrl}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Login failed');
      }

      const data = await response.json();
      this._handleAuthResponse(data);
      return { success: true, user: this.user };
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  // Register function
  async register(name, email, password) {
    try {
      const response = await fetch(`${this.apiUrl}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Registration failed');
      }

      const data = await response.json();
      this._handleAuthResponse(data);
      return { success: true, user: this.user };
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  // Logout function
  logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    this.token = null;
    this.user = null;
  }

  // Check if user is authenticated
  isAuthenticated() {
    return !!this.token;
  }

  // Get current user
  getCurrentUser() {
    return this.user;
  }

  // Get auth token
  getToken() {
    return this.token;
  }

  // Add auth token to API requests
  getAuthHeaders() {
    return {
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    };
  }

  // Handle successful auth response
  _handleAuthResponse(data) {
    const { token, user } = data;
    this.token = token;
    this.user = user;
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  // Refresh token
  async refreshToken() {
    try {
      const response = await fetch(`${this.apiUrl}/auth/refresh`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
      });

      if (!response.ok) throw new Error('Token refresh failed');

      const data = await response.json();
      this._handleAuthResponse(data);
      return true;
    } catch (error) {
      this.logout();
      throw error;
    }
  }

  // Password reset request
  async requestPasswordReset(email) {
    try {
      const response = await fetch(`${this.apiUrl}/auth/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Password reset request failed');
      }

      return { success: true };
    } catch (error) {
      console.error('Password reset request error:', error);
      throw error;
    }
  }

  // Reset password with token
  async resetPassword(token, newPassword) {
    try {
      const response = await fetch(`${this.apiUrl}/auth/reset-password/confirm`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, newPassword }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Password reset failed');
      }

      return { success: true };
    } catch (error) {
      console.error('Password reset error:', error);
      throw error;
    }
  }
}

export default new AuthService();