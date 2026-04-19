/**
 * TODO: Global error handler
 *
 * 1. Handle Mongoose validation errors (error.name === 'ValidationError'):
 *    - Return 400 with { error: { message: error.message } }
 * 2. Handle Mongoose duplicate key errors (error.code === 11000):
 *    - Return 409 with { error: { message: "Email already exists" } }
 * 3. Handle all other errors:
 *    - Return 500 with { error: { message: error.message } }
 */
export function errorHandler(error, req, res, next) {
  if (error.name === "ValidationError") {
    return res.status(400).json({
      error: error.message || "Validation Error",
    });
  }
  // MongoDB duplicate key (e.g. email already exists at DB level)
  if (error.code === 11000) {
    const field = Object.keys(error.keyValue || {})[0] || "field";
    return res.status(409).json({
      success: false,
      message: `An account with this ${field} already exists.`,
    });
  }

  // Mongoose bad ObjectId (e.g. /users/not-a-valid-id)
  if (error.name === "CastError") {
    return res.status(400).json({
      success: false,
      message: `Invalid value for ${error.path}.`,
    });
  }

  // JWT errors (if you add auth later)
  if (error.name === "JsonWebTokenError") {
    return res.status(401).json({
      success: false,
      message: "Invalid token. Please log in again.",
    });
  }

  if (error.name === "TokenExpiredError") {
    return res.status(401).json({
      success: false,
      message: "Your session has expired. Please log in again.",
    });
  }

  // Fallback — always end with this, never call next() here
  return res.status(500).json({
    success: false,
    message: "Something went wrong. Please try again later.",
  });
}
