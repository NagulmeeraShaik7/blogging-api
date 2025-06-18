import mongoose from 'mongoose';

/**
 * Mongoose schema for the User collection.
 * @typedef {Object} UserSchema
 * @property {string} username - The unique username of the user, required.
 * @property {string} email - The unique email address of the user, required.
 * @property {string} password - The user's password, required.
 * @property {Object} timestamps - Automatically adds createdAt and updatedAt timestamps.
 */
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });

/**
 * Mongoose model for the User collection.
 * @type {mongoose.Model}
 */
export default mongoose.model('User', userSchema);