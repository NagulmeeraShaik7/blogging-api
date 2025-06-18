/**
 * Middleware to handle errors in an Express.js application.
 * @param {Error} err - The error object thrown or passed to the middleware.
 * @param {Object} req - The Express.js request object.
 * @param {Object} res - The Express.js response object.
 * @param {Function} next - The Express.js next middleware function.
 * @returns {void} Sends a JSON response with error details and appropriate status code.
 */
export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  
  res.status(statusCode).json({
    error: {
      message,
      status: statusCode,
    },
  });
};