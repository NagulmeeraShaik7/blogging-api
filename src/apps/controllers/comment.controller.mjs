import { createCommentUseCase, getBlogCommentsUseCase } from '../usecases/comment.usecase.mjs';

/**
 * Creates a new comment for a blog.
 * @async
 * @param {Object} req - Express request object containing comment data in the body.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function for error handling.
 * @returns {Promise<void>} Responds with the created comment and status 201.
 * @throws {Error} Passes any errors to the next middleware.
 */
export const createComment = async (req, res, next) => {
  try {
    const comment = await createCommentUseCase(req.body);
    res.status(201).json(comment);
  } catch (error) {
    next(error);
  }
};

/**
 * Retrieves all comments for a specific blog.
 * @async
 * @param {Object} req - Express request object containing blog ID in params.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function for error handling.
 * @returns {Promise<void>} Responds with an array of comments for the specified blog and status 200.
 * @throws {Error} Passes any errors to the next middleware.
 */
export const getBlogComments = async (req, res, next) => {
  try {
    const comments = await getBlogCommentsUseCase(req.params.blogId);
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};