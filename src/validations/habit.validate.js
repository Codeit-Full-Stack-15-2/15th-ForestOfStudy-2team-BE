import dayjs from '#src/utils/dayjs.js';
import { z } from 'zod';
import { paginationQuerySchema } from './commonSchema.js';

export const createHabitSchema = z.object({
  title: z
    .array(
      z
        .string({ required_error: '습관은 필수 입력 항목입니다.' })
        .trim()
        .min(1, '습관은 비워둘 수 없습니다.')
        .max(15, '습관은 15자 이하여야 합니다.'),
    )
    .min(1, '최소 하나 이상의 습관을 입력해야 합니다.')
    .refine(
      (titles) => {
        const normalizedTitles = titles.map((t) => t.replace(/\s+/g, ''));
        return new Set(normalizedTitles).size === titles.length;
      },
      {
        message: '중복된 습관이 존재합니다.',
      },
    ),
});

export const updateHabitsSchema = z.object({
  habits: z
    .array(
      z.object({
        id: z.string().or(z.number()),
        title: z
          .string({ required_error: '습관은 필수 입력 항목입니다.' })
          .min(1, '습관은 비워둘 수 없습니다.')
          .max(15, '습관은 15자 이하여야 합니다.'),
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
    })
    .positive('습관 아이디는 양수여야 합니다.'),
});

export const habitRecordSchema = z.object({
  study_id: z.coerce
    .number({ invalid_type_error: '스터디 ID는 숫자여야 합니다.' })
    .int('스터디 ID는 정수여야 합니다.')
    .positive('스터디 ID는 양수여야 합니다.'),
  habit_id: z.coerce
    .number({ invalid_type_error: '습관 ID는 숫자여야 합니다.' })
    .int('습관 ID는 정수여야 합니다.')
    .positive('습관 ID는 양수여야 합니다.'),
});

export const toggleHabitRecordSchema = z.object({
  recordDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, '날짜 형식은 YYYY-MM-DD 이어야 합니다.')
    .optional(),
});

export const deleteHabitsSchema = z.object({
  habitIds: z
    .array(
      z.coerce
        .number({
          required_error: '습관 아이디는 숫자여야 합니다.',
        })
        .int('습관 아이디는 정수여야 합니다.')
        .positive('습관 아이디는 양수여야 합니다.'),
      { required_error: '삭제할 습관 목록(habitIds)는 필수입니다.' },
    )
    .min(1, '삭제할 습관을 최소 하나 이상 선택해 주세요.'),
});

export const getWeeklyHabitRecordsQuerySchema = paginationQuerySchema.extend({
  target_date: z
    .string({ required_error: 'target_date는 필수 입력값입니다.' })
    .refine((val) => dayjs(val, 'YYYY-MM-DD', true).isValid(), {
      message: 'target_date는 유효한 YYYY-MM-DD 형식이어야 합니다.',
    }),
});

export const getMonthlyHabitRecordsQuerySchema = paginationQuerySchema.extend({
  target_date: z
    .string({ required_error: 'target_date는 필수 입력값입니다.' })
    .refine((val) => dayjs(val, 'YYYY-MM-DD', true).isValid(), {
      message: 'target_date는 유효한 YYYY-MM-DD 형식이어야 합니다.',
    }),
});
