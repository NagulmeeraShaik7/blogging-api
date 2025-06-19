import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import swaggerUi from 'swagger-ui-express';
import userRoutes from './src/apps/routers/user.route.mjs';
import blogRoutes from './src/apps/routers/blog.route.mjs';
import commentRoutes from './src/apps/routers/comment.route.mjs';
import { errorHandler } from './src/middleware/error.middleware.mjs';
import swaggerSpec from './src/infrastucture/swagger.config.mjs';

/**
 * Loads environment variables from a .env file into process.env.
 */
dotenv.config();

/**
 * Initializes the Express.js application.
 * @type {express.Application}
 */
const app = express();

/**
 * Initializes the Express.js router.
 * @type {express.Router}
 */
const router = express.Router();

/**
 * Middleware to log incoming HTTP requests.
 * @param {express.Request} req - The Express.js request object.
 * @param {express.Response} res - The Express.js response object.
 * @param {express.NextFunction} next - The Express.js next middleware function.
 * @returns {void} Calls the next middleware in the stack.
 */
const logger = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
};

// Middleware
/**
 * Parses incoming JSON payloads.
 * @middleware
 */
app.use(express.json());

// Swagger UI setup
/**
 * Serves the Swagger UI for API documentation at /api-docs.
 * @middleware
 */
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Register routes with logging
/**
 * Mounts user-related routes with logging middleware.
 * @type {express.Router}
 */
router.use('/users', logger, userRoutes);
/**
 * Mounts blog-related routes with logging middleware.
 * @type {express.Router}
 */
router.use('/blogs', logger, blogRoutes);
/**
 * Mounts comment-related routes with logging middleware.
 * @type {express.Router}
 */
router.use('/comments', logger, commentRoutes);

// Mount the router at /api
/**
 * Mounts the main router at the /api endpoint.
 * @type {express.Router}
 */
app.use('/api', router);

// Error handling middleware
/**
 * Applies the error handling middleware to catch and process errors.
 * @type {Function}
 */
app.use(errorHandler);

/**
 * Connects to the MongoDB database using the provided URI.
 * @returns {Promise<void>} A promise that resolves when the connection is established or rejects on failure.
 * @throws {Error} Exits the process with status code 1 if the connection fails.
 */
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

/**
 * The port on which the server will listen.
 * @type {number|string}
 */
const PORT = process.env.PORT || 3000;

/**
 * Starts the MongoDB connection and Express.js server.
 */
connectDB()
  .then(() => {
    /**
     * Starts the Express.js server on the specified port.
     * @param {number} PORT - The port number to listen on.
     * @param {Function} callback - Callback function executed when the server starts.
     */
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`API documentation available at http://localhost:${PORT}/api-docs`);
    });
  })
  .catch((error) => {
    console.error('Database connection failed:', error);
  });