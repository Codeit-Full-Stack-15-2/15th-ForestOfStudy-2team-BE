// TODO: params, query, body 분기처리 필수
export const validate = (schema, target = 'body') => {
  return (req, res, next) => {
    const dataToValidate = req[target];
    const result = schema.safeParse(dataToValidate);
    if (!result.success) {
      //TODO: flattenError 리펙토링
      const errorMessage = result.error.errors[0].message;
      const error = new Error(errorMessage);
      error.statusCode = 400;
      next(error);
      return;
    }
    // TODO:원본값 훼손 방지 처리
    req[target] = result.data;
    next();
  };
};
