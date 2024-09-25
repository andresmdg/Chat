import * as Yup from 'yup'

export const loginSchema = () => Yup.object({
  username: Yup.string().required("Ingrese su nombre de usuario para continuar"),
  password: Yup.string().required("Ingrese su contraseña para continuar"),
})