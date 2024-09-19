import * as Yup from 'yup'

export const loginSchema = () => Yup.object({
  email: Yup.string().email("Email inválido").required("Ingrese su correo para continuar"),
  password: Yup.string().required("Ingrese su contraseña para continuar"),
})