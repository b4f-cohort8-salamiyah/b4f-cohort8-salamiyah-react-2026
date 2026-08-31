export const sendSuccess = (
  res,
  data,
  statusCode = 200,
  message = "Success",
) => {
  return res.status(statusCode).json({ success: true, message, data });
};

export const sendError = (
  res,
  message = "Something went wrong",
  statusCode = 500,
  errors = null,
) => {
  return res.status(statusCode).json({
    success: false,
    message,
    errors,
  });
};
