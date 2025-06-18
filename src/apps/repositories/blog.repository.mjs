import Blog from '../models/blog.model.mjs';

/**
 * Creates a new blog.
 * @async
 * @param {Object} blogData - The data for the new blog, including title, content, and author.
 * @returns {Promise<Object>} The created blog document.
 * @throws {Error} If the blog creation fails.
 */
export const createBlog = async (blogData) => {
  return await Blog.create(blogData);
};

/**
 * Retrieves a blog by its ID, populating the author's username.
 * @async
 * @param {string} id - The ID of the blog to retrieve.
 * @returns {Promise<Object|null>} The blog document with populated author username, or null if not found.
 * @throws {Error} If the blog retrieval fails.
 */
export const findBlogById = async (id) => {
  return await Blog.findById(id).populate('author', 'username');
};

/**
 * Retrieves all blogs, populating each author's username.
 * @async
 * @returns {Promise<Array<Object>>} An array of blog documents with populated author usernames.
 * @throws {Error} If the retrieval of blogs fails.
 */
export const findAllBlogs = async () => {
  return await Blog.find().populate('author', 'username');
};