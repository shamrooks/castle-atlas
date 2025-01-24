// Using the Web Crypto API for secure cryptographic operations
const IV_LENGTH = 12; // Length for GCM mode
const SALT_LENGTH = 16;
const KEY_LENGTH = 256;
const ITERATIONS = 100000;

export const encryptionUtils = {
  /**
   * Generates a secure random key
   * @param {number} length - Length of the key in bytes
   * @returns {Uint8Array} - Random key
   */
  generateKey: async (length = 32) => {
    return crypto.getRandomValues(new Uint8Array(length));
  },

  /**
   * Derives a key from a password using PBKDF2
   * @param {string} password - User's password
   * @param {Uint8Array} salt - Salt for key derivation
   * @returns {CryptoKey} - Derived key
   */
  deriveKey: async (password, salt) => {
    const enc = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey(
      'raw',
      enc.encode(password),
      { name: 'PBKDF2' },
      false,
      ['deriveBits', 'deriveKey']
    );

    return crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: salt,
        iterations: ITERATIONS,
        hash: 'SHA-256'
      },
      keyMaterial,
      { name: 'AES-GCM', length: KEY_LENGTH },
      true,
      ['encrypt', 'decrypt']
    );
  },

  /**
   * Encrypts data using AES-GCM
   * @param {string} data - Data to encrypt
   * @param {string} password - Password for encryption
   * @returns {string} - Encrypted data as base64 string
   */
  encrypt: async (data, password) => {
    try {
      const salt = crypto.getRandomValues(new Uint8Array(SALT_LENGTH));
      const iv = crypto.getRandomValues(new Uint8Array(IV_LENGTH));
      const key = await encryptionUtils.deriveKey(password, salt);
      
      const enc = new TextEncoder();
      const encodedData = enc.encode(data);

      const encrypted = await crypto.subtle.encrypt(
        {
          name: 'AES-GCM',
          iv: iv
        },
        key,
        encodedData
      );

      // Combine salt, IV, and encrypted data
      const result = new Uint8Array(salt.length + iv.length + encrypted.byteLength);
      result.set(salt, 0);
      result.set(iv, salt.length);
      result.set(new Uint8Array(encrypted), salt.length + iv.length);

      return btoa(String.fromCharCode(...result));
    } catch (error) {
      console.error('Encryption error:', error);
      throw new Error('Failed to encrypt data');
    }
  },

  /**
   * Decrypts AES-GCM encrypted data
   * @param {string} encryptedData - Base64 encoded encrypted data
   * @param {string} password - Password for decryption
   * @returns {string} - Decrypted data
   */
  decrypt: async (encryptedData, password) => {
    try {
      const rawData = Uint8Array.from(atob(encryptedData), c => c.charCodeAt(0));
      
      const salt = rawData.slice(0, SALT_LENGTH);
      const iv = rawData.slice(SALT_LENGTH, SALT_LENGTH + IV_LENGTH);
      const data = rawData.slice(SALT_LENGTH + IV_LENGTH);

      const key = await encryptionUtils.deriveKey(password, salt);

      const decrypted = await crypto.subtle.decrypt(
        {
          name: 'AES-GCM',
          iv: iv
        },
        key,
        data
      );

      const dec = new TextDecoder();
      return dec.decode(decrypted);
    } catch (error) {
      console.error('Decryption error:', error);
      throw new Error('Failed to decrypt data');
    }
  },

  /**
   * Hashes data using SHA-256
   * @param {string} data - Data to hash
   * @returns {string} - Hashed data as hex string
   */
  hash: async (data) => {
    try {
      const enc = new TextEncoder();
      const hashBuffer = await crypto.subtle.digest('SHA-256', enc.encode(data));
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    } catch (error) {
      console.error('Hashing error:', error);
      throw new Error('Failed to hash data');
    }
  },

  /**
   * Generates a secure random token
   * @param {number} length - Length of the token
   * @returns {string} - Random token
   */
  generateToken: (length = 32) => {
    const array = new Uint8Array(length);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  },

  /**
   * Performs constant-time string comparison
   * @param {string} a - First string
   * @param {string} b - Second string
   * @returns {boolean} - True if strings are equal
   */
  secureCompare: (a, b) => {
    if (a.length !== b.length) return false;
    let result = 0;
    for (let i = 0; i < a.length; i++) {
      result |= a.charCodeAt(i) ^ b.charCodeAt(i);
    }
    return result === 0;
  }
};