import * as Yup from 'yup'

export const signupSchema = () => Yup.object({
  name: Yup.string().required("Ingrese su nombre"),
  username: Yup.string().required("Ingrese un nombre de usuario"),
  password: Yup.string().min(8, "La contraseña Debe tener por lo menos 8 caracteres").required("Ingrese una contraseña"),
  confirmPassword: Yup.string()
    .required("Confirme su contraseña")
    .oneOf([Yup.ref('password')], 'Las contraseñas deben coincidir')
})