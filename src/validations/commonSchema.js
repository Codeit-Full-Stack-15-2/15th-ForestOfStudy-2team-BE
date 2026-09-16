import z from 'zod';

export const paginationQuerySchema = z.object({
  page: z.coerce
    .number({ invalid_type_error: '페이지는 숫자여야 합니다.' })
    .int('페이지는 정수여야 합니다.')
    .positive('페이지는 1 이상의 양수여야 합니다.')
    .default(1),
  page_size: z.coerce
    .number({ invalid_type_error: '페이지 사이즈는 숫자여야 합니다.' })
    .int('페이지 사이즈는 정수여야 합니다.')
    .positive('페이지 사이즈는 양수여야 합니다.')
    .max(100, '한 번에 최대 100개까지만 조회할 수 있습니다.')
    .default(7),
});
