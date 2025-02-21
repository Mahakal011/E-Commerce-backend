const jwt = require('jsonwebtoken');

/**
 * Generates a JWT token with the given payload and options
 * @param {Object} payload - Data to be encoded in the token
 * @param {string} secretKey - Secret key for signing the token
 * @param {Object} options - JWT options (optional)
 * @returns {string} JWT token
 */
function generateToken(payload, secretKey, options = {}) {
    // Default options
    const defaultOptions = {
        expiresIn: '31d',  // Token expires in 1 hour
        algorithm: 'HS256' // HMAC SHA-256 signing algorithm
    };

    // Merge default options with provided options
    const tokenOptions = { ...defaultOptions, ...options };

    try {
        // Generate and return the token
        const token = jwt.sign(payload, secretKey, tokenOptions);
        return token;
    } catch (error) {
        throw new Error(`Error generating token: ${error.message}`);
    }
}

/**
 * Verify and decode a JWT token
 * @param {string} token - JWT token to verify
 * @param {string} secretKey - Secret key used to sign the token
 * @returns {Object} Decoded token payload
 */
function verifyToken(token, secretKey) {
    try {
        const decoded = jwt.verify(token, secretKey);
        return decoded;
    } catch (error) {
        throw new Error(`Error verifying token: ${error.message}`);
    }
}

module.exports = {
    generateToken,
    verifyToken
};