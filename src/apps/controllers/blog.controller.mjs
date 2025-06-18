import { createBlogUseCase, getBlogUseCase, getAllBlogsUseCase } from '../usecases/blog.usecase.mjs';

/**
 * Creates a new blog.
 * @async
 * @param {Object} req - Express request object containing blog data and author in the body.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function for error handling.
 * @returns {Promise<void>} Responds with the created blog and status 201.
 * @throws {Error} Passes any errors to the next middleware.
 */
export const createBlog = async (req, res, next) => {
  try {
    const blog = await createBlogUseCase(req.body, req.body.author);
    res.status(201).json(blog);
  } catch (error) {
    next(error);
  }
};

/**
 * Retrieves a blog by its ID.
 * @async
 * @param {Object} req - Express request object containing blog ID in params.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function for error handling.
 * @returns {Promise<void>} Responds with the requested blog and status 200.
 * @throws {Error} Passes any errors to the next middleware.
 */
export const getBlog = async (req, res, next) => {
  try {
    const blog = await getBlogUseCase(req.params.id);
    res.status(200).json(blog);
  } catch (error) {
    next(error);
  }
};

/**
 * Retrieves all blogs.
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function for error handling.
 * @returns {Promise<void>} Responds with an array of all blogs and status 200.
 * @throws {Error} Passes any errors to the next middleware.
 */
export const getAllBlogs = async (req, res, next) => {
  try {
    const blogs = await getAllBlogsUseCase();
    res.status(200).json(blogs);
  } catch (error) {
    next(error);
  }
};