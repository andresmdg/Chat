import * as Yup from 'yup';

export const decodeTokenSchema = Yup.object({
  exp: Yup.number().required(),
  iat: Yup.number().required(),
  id: Yup.string().required()
})

export const userResponseSchema = Yup.object({
  success: Yup.boolean().required(),
  user: Yup.object({
    id: Yup.string().required(),
    name: Yup.string().required(),
    username: Yup.string().required().nullable(),
    avatarUrl: Yup.string().required().nullable()
  })
})

export const loginResponseValidator = Yup.object({
  success: Yup.boolean().required(),
  token: Yup.string().required(),
  message: Yup.string().required()
});