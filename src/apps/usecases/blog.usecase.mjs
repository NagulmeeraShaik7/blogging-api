import { createBlog, findBlogById, findAllBlogs } from '../repositories/blog.repository.mjs';

/**
 * Creates a new blog post.
 * @param {Object} blogData - The data for the new blog post.
 * @param {string} blogData.title - The title of the blog post.
 * @param {string} blogData.content - The content of the blog post.
 * @param {string} userId - The ID of the user creating the blog post.
 * @returns {Promise<Object>} A promise that resolves to the created blog post.
 * @throws {Error} If title or content is missing, throws an error with status code 400.
 */
export const createBlogUseCase = async (blogData, userId) => {
  const { title, content } = blogData;
  
  if (!title || !content) {
    const error = new Error('Title and content are required');
    error.statusCode = 400;
    throw error;
  }

  return await createBlog({ ...blogData, author: userId });
};

/**
 * Retrieves a blog post by its ID.
 * @param {string} id - The ID of the blog post to retrieve.
 * @returns {Promise<Object>} A promise that resolves to the blog post object.
 * @throws {Error} If the blog post is not found, throws an error with status code 404.
 */
export const getBlogUseCase = async (id) => {
  const blog = await findBlogById(id);
  if (!blog) {
    const error = new Error('Blog not found');
    error.statusCode = 404;
    throw error;
  }
  return blog;
};

/**
 * Retrieves all blog posts.
 * @returns {Promise<Object[]>} A promise that resolves to an array of blog post objects.
 */
export const getAllBlogsUseCase = async () => {
  return await findAllBlogs();
};