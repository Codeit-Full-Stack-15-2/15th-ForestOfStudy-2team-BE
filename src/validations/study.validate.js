import { z } from 'zod';

export const createStudySchema = z.object({
  nickname: z
    .string({ required_error: '닉네임은 필수 입력 항목입니다.' })
    .min(1, '닉네임은 비워둘 수 없습니다.')
    .max(10, '닉네임은 10자 이하여야 합니다.'),

  title: z
    .string({ required_error: '스터디 이름은 필수 입력 항목입니다.' })
    .min(1, '스터디 이름은 비워둘 수 없습니다.')
    .max(10, '스터디 이름은 10자 이하여야 합니다.'),

  description: z.string().max(100, '소개글은 100자 이하여야 합니다.').nullish(),

  background: z
    .string({ required_error: '배경화면 정보는 필수입니다.' })
    .min(1, '배경화면 값을 입력해주세요.'),

  study_password: z
    .string({ required_error: '비밀번호는 필수 입력 항목입니다.' })
    .min(1, '비밀번호를 입력해주세요.'),

  point: z
    .number()
    .int('포인트는 정수여야 합니다.')
    .min(0, '포인트는 0 이상이어야 합니다.')
    .default(0),
});

export const verifyPasswordSchema = z.object({
  study_password: z
    .string({ required_error: '비밀번호는 필수 입력값입니다.' })
    .min(4, { message: '비밀번호는 최소 4글자 이상이어야 합니다.' }),
});

export const studyIdSchema = z.object({
  study_id: z.coerce
    .number({
      required_error: '스터디 아이디는 필수 입력값입니다.',
    })
    .int({
      message: '스터디 아이디는 정수여야 합니다.',
    })
    .positive('스터디 아이디는 양수여야 합니다.'),
});

export const createReactionSchema = z.object({
  emoji: z
    .string({ required_error: '이모지는 필수 입력값입니다.' })
    .min(1, '이모지는 최소 1자 이상이어야 합니다.')
    .max(50, '이모지는 최대 50자까지 허용됩니다.'),
  guest_uuid: z
    .string({ required_error: 'guestUuid는 필수 입력값입니다.' })
    .uuid({ message: '올바른 UUID 형식이 아닙니다.' })
    .nullish(),
});
