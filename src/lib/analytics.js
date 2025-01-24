import { ANALYTICS_EVENTS } from './constants';

class Analytics {
  constructor() {
    this.initialized = false;
    this.queue = [];
    this.debugMode = process.env.NODE_ENV === 'development';
  }

  /**
   * Initialize analytics with configuration
   */
  init(config = {}) {
    this.config = {
      appId: config.appId || process.env.REACT_APP_ANALYTICS_ID,
      debug: config.debug || this.debugMode,
      sampleRate: config.sampleRate || 100, // Percentage of events to track
      ...config
    };

    // Process any queued events
    this.processQueue();
    this.initialized = true;

    // Set up error tracking
    this.setupErrorTracking();
    
    // Track initial page view
    this.pageView();
  }

  /**
   * Process queued events after initialization
   */
  processQueue() {
    while (this.queue.length > 0) {
      const { event, data } = this.queue.shift();
      this.track(event, data);
    }
  }

  /**
   * Track an analytics event
   */
  track(event, data = {}) {
    if (!this.initialized) {
      this.queue.push({ event, data });
      return;
    }

    // Check sampling rate
    if (Math.random() * 100 > this.config.sampleRate) {
      return;
    }

    const eventData = {
      event,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent,
      ...this.getCommonProperties(),
      ...data
    };

    if (this.config.debug) {
      console.log('Analytics Event:', eventData);
    }

    // Send to analytics service
    this.send(eventData);
  }

  /**
   * Track page views
   */
  pageView(path = window.location.pathname) {
    this.track('page_view', {
      path,
      title: document.title,
      referrer: document.referrer
    });
  }

  /**
   * Track user events
   */
  trackUser(action, userData = {}) {
    this.track(`user_${action}`, userData);
  }

  /**
   * Track learning progress
   */
  trackProgress(action, progressData = {}) {
    this.track(`learning_${action}`, progressData);
  }

  /**
   * Track feature usage
   */
  trackFeature(featureName, data = {}) {
    this.track('feature_usage', {
      feature: featureName,
      ...data
    });
  }

  /**
   * Track errors
   */
  trackError(error, context = {}) {
    this.track('error', {
      message: error.message,
      stack: error.stack,
      ...context
    });
  }

  /**
   * Setup global error tracking
   */
  setupErrorTracking() {
    window.addEventListener('error', (event) => {
      this.trackError(event.error, {
        type: 'uncaught_error',
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno
      });
    });

    window.addEventListener('unhandledrejection', (event) => {
      this.trackError(event.reason, {
        type: 'unhandled_rejection'
      });
    });
  }

  /**
   * Track performance metrics
   */
  trackPerformance() {
    if (window.performance) {
      const timing = window.performance.timing;
      const perfData = {
        loadTime: timing.loadEventEnd - timing.navigationStart,
        domReady: timing.domContentLoadedEventEnd - timing.navigationStart,
        firstPaint: timing.responseEnd - timing.navigationStart,
        ttfb: timing.responseStart - timing.navigationStart
      };
      
      this.track('performance', perfData);
    }
  }

  /**
   * Get common properties for all events
   */
  getCommonProperties() {
    return {
      sessionId: this.getSessionId(),
      userId: this.getUserId(),
      timestamp: new Date().toISOString(),
      platform: 'web',
      environment: process.env.NODE_ENV
    };
  }

  /**
   * Get or create session ID
   */
  getSessionId() {
    let sessionId = sessionStorage.getItem('analytics_session_id');
    if (!sessionId) {
      sessionId = `sess_${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem('analytics_session_id', sessionId);
    }
    return sessionId;
  }

  /**
   * Get user ID if available
   */
  getUserId() {
    // This should be integrated with your auth system
    return localStorage.getItem('userId') || 'anonymous';
  }

  /**
   * Send data to analytics service
   */
  async send(data) {
    try {
      if (this.config.debug) {
        console.log('Sending analytics data:', data);
        return;
      }

      const response = await fetch(`${this.config.apiEndpoint}/events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-App-ID': this.config.appId
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Failed to send analytics data');
      }
    } catch (error) {
      if (this.config.debug) {
        console.error('Analytics Error:', error);
      }
    }
  }
}

// Create and export singleton instance
export const analytics = new Analytics();

// Convenience exports for common events
export const trackEvent = (event, data) => analytics.track(event, data);
export const trackPageView = (path) => analytics.pageView(path);
export const trackError = (error, context) => analytics.trackError(error, context);