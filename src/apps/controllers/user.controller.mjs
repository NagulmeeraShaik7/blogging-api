import { createUserUseCase, getUserUseCase } from '../usecases/user.usecase.mjs';

/**
 * Creates a new user.
 * @async
 * @param {Object} req - Express request object containing user data in the body.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function for error handling.
 * @returns {Promise<void>} Responds with the created user and status 201.
 * @throws {Error} Passes any errors to the next middleware.
 */
export const createUser = async (req, res, next) => {
  try {
    const user = await createUserUseCase(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

/**
 * Retrieves a user by their ID.
 * @async
 * @param {Object} req - Express request object containing user ID in params.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function for error handling.
 * @returns {Promise<void>} Responds with the requested user and status 200.
 * @throws {Error} Passes any errors to the next middleware.
 */
export const getUser = async (req, res, next) => {
  try {
    const user = await getUserUseCase(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};