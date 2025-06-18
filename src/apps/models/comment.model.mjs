import mongoose from 'mongoose';

/**
 * Mongoose schema for the Comment collection.
 * @typedef {Object} CommentSchema
 * @property {string} content - The content of the comment, required.
 * @property {mongoose.Schema.Types.ObjectId} author - Reference to the User who authored the comment, required.
 * @property {mongoose.Schema.Types.ObjectId} blog - Reference to the Blog the comment is associated with, required.
 * @property {Object} timestamps - Automatically adds createdAt and updatedAt timestamps.
 */
const commentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  blog: { type: mongoose.Schema.Types.ObjectId, ref: 'Blog', required: true },
}, { timestamps: true });

/**
 * Mongoose model for the Comment collection.
 * @type {mongoose.Model}
 */
export default mongoose.model('Comment', commentSchema);