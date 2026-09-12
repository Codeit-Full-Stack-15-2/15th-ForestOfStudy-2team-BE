import {z} from 'zod';

export const createHabitSchema = z.object({
  title: z
  .string({ required_error: '습관은 필수 입력 항목입니다.'})
  .min(1, '습관은 비워둘 수 없습니다.')
  .max(20, '습관은 20자 이하여야 합니다.'),
})

export const updateHabitsSchema = z.object({
  habits: z.array(
    z.object({
      id: z.string().or(z.number()),
      title: z
       .string({ required_error: '습관은 필수 입력 항목입니다.'})
  .min(1, '습관은 비워둘 수 없습니다.')
  .max(20, '습관은 20자 이하여야 합니다.'),
    })
  ).min(1, '수정할 습관이 최소 1개 이상이어야 합니다.'),
})

export const habitIdSchema = z.object({
  habit_id: z.coerce
    .number({
      required_error: '습관 아이디는 숫자여야 합니다.',
    })
    .int({
      message: '습관 아이디는 정수여야 합니다.',
    }),
});