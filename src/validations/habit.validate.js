import { z } from 'zod';

export const createHabitSchema = z.object({
  title: z
    .string({ required_error: '습관은 필수 입력 항목입니다.' })
    .min(1, '습관은 비워둘 수 없습니다.')
    .max(20, '습관은 20자 이하여야 합니다.'),
});

export const updateHabitsSchema = z.object({
  habits: z
    .array(
      z.object({
        id: z.string().or(z.number()),
        title: z
          .string({ required_error: '습관은 필수 입력 항목입니다.' })
          .min(1, '습관은 비워둘 수 없습니다.')
          .max(20, '습관은 20자 이하여야 합니다.'),
      }),
    )
    .min(1, '수정할 습관이 최소 1개 이상이어야 합니다.'),
});

export const habitIdSchema = z.object({
  habit_id: z.coerce
    .number({
      required_error: '습관 아이디는 숫자여야 합니다.',
    })
    .int({
      message: '습관 아이디는 정수여야 합니다.',
    }),
});

export const getWeeklyHabitRecordsQuerySchema = z.object({
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
  target_date: z
    .string({ required_error: 'startDate는 필수 입력값입니다.' })
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'startDate는 YYYY-MM-DD 형식이어야 합니다.'),
});
