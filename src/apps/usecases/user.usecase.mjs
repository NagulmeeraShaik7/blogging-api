import { createUser, findUserById, findUserBlogs } from '../repositories/user.repository.mjs';
import bcrypt from 'bcrypt';

/**
 * Creates a new user with a hashed password.
 * @param {Object} userData - The data for the new user.
 * @param {string} userData.username - The username of the user.
 * @param {string} userData.email - The email address of the user.
 * @param {string} userData.password - The plain-text password of the user.
 * @returns {Promise<Object>} A promise that resolves to the created user object.
 * @throws {Error} If username, email, or password is missing, throws an error with status code 400.
 */
export const createUserUseCase = async (userData) => {
  const { username, email, password } = userData;
  
  if (!username || !email || !password) {
    const error = new Error('All fields are required');
    error.statusCode = 400;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  return await createUser({ username, email, password: hashedPassword });
};

/**
 * Retrieves a user by their ID.
 * @param {string} id - The ID of the user to retrieve.
 * @returns {Promise<Object>} A promise that resolves to the user object.
 * @throws {Error} If the user is not found, throws an error with status code 404.
 */
export const getUserUseCase = async (id) => {
  const user = await findUserById(id);
  if (!user) {
    const error = new Error('User not found');
    error.statusCode = 404;
    throw error;
  }
  return user;
};

/**
 * Retrieves all blogs associated with a specific user.
 * @param {string} userId - The ID of the user whose blogs are to be retrieved.
 * @returns {Promise<Object[]>} A promise that resolves to an array of blog objects.
 * @throws {Error} If the user is not found, throws an error with status code 404.
 */
export const getUserBlogsUseCase = async (userId) => {
  const user = await findUserBlogs(userId);
  if (!user) {
    const error = new Error('User not found');
    error.statusCode = 404;
    throw error;
  }
  return user.blogs;
};