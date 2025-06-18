import Comment from '../models/comment.model.mjs';

/**
 * Creates a new comment.
 * @async
 * @param {Object} commentData - The data for the new comment, including content, author, and blog ID.
 * @returns {Promise<Object>} The created comment document.
 * @throws {Error} If the comment creation fails.
 */
export const createComment = async (commentData) => {
  return await Comment.create(commentData);
};

/**
 * Retrieves all comments for a specific blog, populating the author's username.
 * @async
 * @param {string} blogId - The ID of the blog to retrieve comments for.
 * @returns {Promise<Array<Object>>} An array of comment documents with populated author usernames.
 * @throws {Error} If the comment retrieval fails.
 */
export const findCommentsByBlogId = async (blogId) => {
  return await Comment.find({ blog: blogId }).populate('author', 'username');
};