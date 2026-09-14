import { z } from 'zod';

export const createHabitSchema = z.object({
  title: z
    .array(
      z
        .string({ required_error: '습관은 필수 입력 항목입니다.' })
        .trim()
        .min(1, '습관은 비워둘 수 없습니다.')
        .max(20, '습관은 20자 이하여야 합니다.'),
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
    })
    .positive('습관 아이디는 양수여야 합니다.'),
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
