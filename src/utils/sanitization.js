/**
 * Utility functions for input sanitization and validation
 */
export const sanitizationUtils = {
    /**
     * Sanitizes text input by removing potentially dangerous characters
     * @param {string} input - Text to sanitize
     * @returns {string} - Sanitized text
     */
    sanitizeText: (input) => {
      if (typeof input !== 'string') return '';
      
      return input
        .replace(/[<>]/g, '') // Remove < and >
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .replace(/\//g, '&#x2F;')
        .trim();
    },
  
    /**
     * Sanitizes HTML content while preserving safe tags and attributes
     * @param {string} html - HTML content to sanitize
     * @returns {string} - Sanitized HTML
     */
    sanitizeHtml: (html) => {
      if (typeof html !== 'string') return '';
  
      // Define allowed tags and attributes
      const allowedTags = new Set(['p', 'b', 'i', 'em', 'strong', 'a', 'ul', 'ol', 'li', 'br']);
      const allowedAttributes = new Set(['href', 'title', 'target']);
  
      // Create a temporary element
      const temp = document.createElement('div');
      temp.innerHTML = html;
  
      // Recursive function to sanitize nodes
      const sanitizeNode = (node) => {
        // Remove script tags and on* attributes
        if (node.nodeType === 1) { // Element node
          // Remove disallowed tags
          if (!allowedTags.has(node.tagName.toLowerCase())) {
            node.parentNode?.removeChild(node);
            return;
          }
  
          // Remove disallowed attributes
          Array.from(node.attributes).forEach(attr => {
            if (!allowedAttributes.has(attr.name) || 
                (attr.name === 'href' && !attr.value.startsWith('http'))) {
              node.removeAttribute(attr.name);
            }
          });
        }
  
        // Recursively sanitize child nodes
        Array.from(node.childNodes).forEach(sanitizeNode);
      };
  
      sanitizeNode(temp);
      return temp.innerHTML;
    },
  
    /**
     * Sanitizes file names to prevent directory traversal
     * @param {string} filename - File name to sanitize
     * @returns {string} - Sanitized file name
     */
    sanitizeFilename: (filename) => {
      if (typeof filename !== 'string') return '';
      
      return filename
        .replace(/[^a-zA-Z0-9.-]/g, '_') // Replace invalid chars with underscore
        .replace(/\.{2,}/g, '.') // Prevent multiple dots
        .replace(/^\.+|\.+$/g, '') // Remove leading/trailing dots
        .substring(0, 255); // Limit length
    },
  
    /**
     * Sanitizes URL parameters
     * @param {string} url - URL to sanitize
     * @returns {string} - Sanitized URL
     */
    sanitizeUrl: (url) => {
      if (typeof url !== 'string') return '';
  
      try {
        const urlObj = new URL(url);
        // Only allow http and https protocols
        if (!['http:', 'https:'].includes(urlObj.protocol)) {
          throw new Error('Invalid protocol');
        }
        return urlObj.toString();
      } catch (e) {
        return '';
      }
    },
  
    /**
     * Validates and sanitizes email addresses
     * @param {string} email - Email to validate
     * @returns {string} - Sanitized email or empty string if invalid
     */
    sanitizeEmail: (email) => {
      if (typeof email !== 'string') return '';
      
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(email)) return '';
  
      return email.toLowerCase().trim();
    },
  
    /**
     * Strips all HTML tags from text
     * @param {string} html - HTML content
     * @returns {string} - Plain text
     */
    stripHtml: (html) => {
      if (typeof html !== 'string') return '';
      
      return html
        .replace(/<[^>]*>/g, '') // Remove HTML tags
        .replace(/&[^;]+;/g, '') // Remove HTML entities
        .trim();
    },
  
    /**
     * Validates and sanitizes phone numbers
     * @param {string} phone - Phone number to validate
     * @returns {string} - Sanitized phone number or empty string if invalid
     */
    sanitizePhone: (phone) => {
      if (typeof phone !== 'string') return '';
      
      // Remove everything except digits
      const cleaned = phone.replace(/\D/g, '');
      
      // Basic validation (adjust according to your needs)
      if (cleaned.length < 10 || cleaned.length > 15) return '';
      
      return cleaned;
    },
  
    /**
     * Sanitizes search query parameters
     * @param {string} query - Search query to sanitize
     * @returns {string} - Sanitized query
     */
    sanitizeSearchQuery: (query) => {
      if (typeof query !== 'string') return '';
      
      return query
        .replace(/[^\w\s-]/g, '') // Remove special characters
        .trim()
        .substring(0, 100); // Limit length
    },
  
    /**
     * Validates and formats JSON data
     * @param {string|object} data - JSON data to validate
     * @returns {object|null} - Parsed and sanitized JSON object or null if invalid
     */
    sanitizeJson: (data) => {
      try {
        const json = typeof data === 'string' ? JSON.parse(data) : data;
        return JSON.parse(JSON.stringify(json)); // Deep clone and validate
      } catch (e) {
        return null;
      }
    }
  };