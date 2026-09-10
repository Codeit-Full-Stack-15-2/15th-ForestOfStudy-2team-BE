export const validate = (schema) => {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const errorMessage = result.error.errors[0].message;
      const error = new Error(errorMessage);
      error.statusCode = 400;
      next(error);
      return;
    }

    req.body = result.data;
    next();
  };
};
