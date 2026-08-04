import crypto from "crypto";

/**
 * Generate a cryptographically secure random token.
 *
 * @param {number} size - Number of random bytes (default: 32)
 * @returns {string} Hex encoded token
 */
const generateRandomToken = (size = 32) => {
  return crypto.randomBytes(size).toString("hex");
};

export default generateRandomToken;