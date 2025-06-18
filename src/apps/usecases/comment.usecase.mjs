import { createComment, findCommentsByBlogId } from '../repositories/comment.repository.mjs';

/**
 * Creates a new comment for a blog post.
 * @param {Object} commentData - The data for the new comment.
 * @param {string} commentData.content - The content of the comment.
 * @param {string} commentData.author - The ID of the user creating the comment.
 * @param {string} commentData.blog - The ID of the blog post the comment is associated with.
 * @returns {Promise<Object>} A promise that resolves to the created comment.
 * @throws {Error} If content, author, or blog is missing, throws an error with status code 400.
 */
export const createCommentUseCase = async (commentData) => {
  const { content, author, blog } = commentData;
  if (!content || !author || !blog) {
    const error = new Error('Content, author, and blog are required');
    error.statusCode = 400;
    throw error;
  }
  return await createComment(commentData);
};

/**
 * Retrieves all comments for a specific blog post.
 * @param {string} blogId - The ID of the blog post to retrieve comments for.
 * @returns {Promise<Object[]>} A promise that resolves to an array of comment objects.
 */
export const getBlogCommentsUseCase = async (blogId) => {
  return await findCommentsByBlogId(blogId);
};