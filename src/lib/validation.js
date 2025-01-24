import { ERROR_MESSAGES, AUTH_CONSTANTS } from './constants';

export const validationRules = {
  // ... (previous rules remain the same)

  /**
   * Validates date
   */
  date: (value, { min, max } = {}) => {
    const date = new Date(value);
    if (isNaN(date.getTime())) {
      throw new Error('Please enter a valid date');
    }
    if (min && date < new Date(min)) {
      throw new Error(`Date must be after ${new Date(min).toLocaleDateString()}`);
    }
    if (max && date > new Date(max)) {
      throw new Error(`Date must be before ${new Date(max).toLocaleDateString()}`);
    }
    return true;
  },

  /**
   * Validates username format
   */
  username: (value) => {
    const usernameRegex = /^[a-zA-Z0-9_-]{3,20}$/;
    if (!usernameRegex.test(value)) {
      throw new Error('Username must be 3-20 characters and can only contain letters, numbers, underscore, and hyphen');
    }
    return true;
  },

  /**
   * Validates hex color code
   */
  hexColor: (value) => {
    const hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    if (!hexColorRegex.test(value)) {
      throw new Error('Please enter a valid hex color code');
    }
    return true;
  }
};

// Validation schemas for different forms
export const validationSchemas = {
  login: {
    email: (value) => {
      validationRules.required(value);
      validationRules.email(value);
    },
    password: (value) => {
      validationRules.required(value);
    }
  },

  registration: {
    username: (value) => {
      validationRules.required(value);
      validationRules.username(value);
    },
    email: (value) => {
      validationRules.required(value);
      validationRules.email(value);
    },
    password: (value) => {
      validationRules.required(value);
      validationRules.password(value);
    },
    confirmPassword: (value, formData) => {
      validationRules.required(value);
      validationRules.passwordConfirm(value, formData);
    }
  },

  profile: {
    name: (value) => {
      validationRules.required(value);
      validationRules.minLength(value, 2);
    },
    bio: (value) => {
      if (value) {
        validationRules.maxLength(value, 500);
      }
    },
    website: (value) => {
      if (value) {
        validationRules.url(value);
      }
    },
    phone: (value) => {
      if (value) {
        validationRules.phone(value);
      }
    }
  }
};

// Form validator function
export const validateForm = (values, schema) => {
  const errors = {};
  Object.keys(schema).forEach(field => {
    try {
      schema[field](values[field], values);
    } catch (error) {
      errors[field] = error.message;
    }
  });
  return errors;
};