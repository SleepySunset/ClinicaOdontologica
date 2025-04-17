const handleHttpError = (res, message = "ERROR_DETECTED", statusCode = 500, details = null) => {
  res.status(statusCode).json({
    error: true,
    message,
    ...(details && { details })
  });
};

module.exports = { handleHttpError };