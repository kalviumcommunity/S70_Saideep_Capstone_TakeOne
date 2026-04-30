/**
 * Standardize ALL API responses: { success: bool, data: {}, error: null, meta: {} }
 */
exports.successResponse = (res, data = {}, meta = {}, statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    data,
    error: null,
    meta,
  });
};

exports.errorResponse = (res, errorMsg = "Internal Server Error", statusCode = 500) => {
  return res.status(statusCode).json({
    success: false,
    data: null,
    error: errorMsg,
    meta: {},
  });
};
