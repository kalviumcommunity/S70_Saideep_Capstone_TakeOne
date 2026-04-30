const { z } = require("zod");
const { errorResponse } = require("../utils/response");

const validateRequest = (schema) => {
  return (req, res, next) => {
    try {
      const parsed = schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      req.body = parsed.body;
      req.query = parsed.query;
      req.params = parsed.params;
      next();
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          data: null,
          error: "Validation Error",
          meta: { details: err.errors }
        });
      }
      next(err);
    }
  };
};

module.exports = { validateRequest };
