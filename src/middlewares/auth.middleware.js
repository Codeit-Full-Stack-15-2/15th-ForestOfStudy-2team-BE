import jwt from 'jsonwebtoken';

export const verifyAccessToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      const error = new Error('인증 토큰이 존재하지 않거나 잘못되었습니다.');
      error.statusCode = 401;
      throw error;
    }

    const token = authHeader.split(' ')[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.studyId = decoded.studyId;

    next();
  } catch (error) {
    error.statusCode = 401;
    error.message = '유효하지 않거나 만료된 토큰입니다.';
    next(error);
  }
};
