import { BadRequestException } from '#src/errors/bad-request-exception.js';

const createValidator = (target) => (schema) => {
  return (req, res, next) => {
    const dataToValidate = req[target];
    const result = schema.safeParse(dataToValidate);

    if (!result.success) {
      const flattened = result.error.flatten();
      const firstField = Object.keys(flattened.fieldErrors)[0];
      const errorMessage = firstField
        ? flattened.fieldErrors[firstField][0]
        : flattened.formErrors[0] || '잘못된 요청 데이터입니다.';

      return next(new BadRequestException(errorMessage));
    }

    req.validated = {
      ...req.validated,
      [target]: result.data,
    };

    next();
  };
};

export const validateBody = createValidator('body');
export const validateParams = createValidator('params');
export const validateQuery = createValidator('query');
