import User from '../models/user.model.mjs';

/**
 * Creates a new user.
 * @async
 * @param {Object} userData - The data for the new user, including username, email, and password.
 * @returns {Promise<Object>} The created user document.
 * @throws {Error} If the user creation fails.
 */
export const createUser = async (userData) => {
  return await User.create(userData);
};

/**
 * Retrieves a user by their ID, excluding the password field.
 * @async
 * @param {string} id - The ID of the user to retrieve.
 * @returns {Promise<Object|null>} The user document without the password field, or null if not found.
 * @throws {Error} If the user retrieval fails.
 */
export const findUserById = async (id) => {
  return await User.findById(id).select('-password');
};

/**
 * Retrieves a user by their ID and populates their associated blogs.
 * @async
 * @param {string} userId - The ID of the user whose blogs are to be retrieved.
 * @returns {Promise<Object|null>} The user document with populated blogs, or null if not found.
 * @throws {Error} If the user or blog retrieval fails.
 */
export const findUserBlogs = async (userId) => {
  return await User.findById(userId).populate('blogs');
};