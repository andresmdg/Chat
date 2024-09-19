import * as Yup from 'yup'

export const signupSchema = () => Yup.object({
  name: Yup.string().required("Campo requerido"),
  email: Yup.string().email("Email inválido").required("Campo requerido"),
  password: Yup.string().min(8, "La contraseña Debe tener por lo menos 8 caracteres").required("Campo requerido"),
  confirmPassword: Yup.string()
    .required("Campo requerido")
    .oneOf([Yup.ref('password')], 'Las contraseñas deben coincidir')
})