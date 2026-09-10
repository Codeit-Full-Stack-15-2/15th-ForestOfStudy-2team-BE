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

  description: z
    .string({ required_error: '소개글은 필수 입력 항목입니다.' })
    .min(1, '소개글을 반드시 입력해주세요.')
    .max(100, '소개글은 100자 이하여야 합니다.'),

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
