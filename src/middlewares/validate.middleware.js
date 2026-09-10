export const validate = (schema, target = 'body') => {
  return (req, res, next) => {
    const dataToValidate = req[target];
    const result = schema.safeParse(dataToValidate);

    if (!result.success) {
      const errorMessage = result.error.errors[0].message;
      const error = new Error(errorMessage);
      error.statusCode = 400;
      next(error);
      return;
    }

    req[target] = result.data;
    next();
  };
};
