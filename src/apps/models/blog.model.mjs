import mongoose from 'mongoose';

/**
 * Mongoose schema for the Blog collection.
 * @typedef {Object} BlogSchema
 * @property {string} title - The title of the blog, required.
 * @property {string} content - The content of the blog, required.
 * @property {mongoose.Schema.Types.ObjectId} author - Reference to the User who authored the blog, required.
 * @property {Object} timestamps - Automatically adds createdAt and updatedAt timestamps.
 */
const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

/**
 * Mongoose model for the Blog collection.
 * @type {mongoose.Model}
 */
export default mongoose.model('Blog', blogSchema);