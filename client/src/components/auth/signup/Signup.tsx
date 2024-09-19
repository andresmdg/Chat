import { useEffect, useState } from "react";
import { ButtonForm } from "@/components/Buttons";
import { Input } from "@/components/Input";
import { NavLink, useNavigate } from "react-router-dom";
import { useFormik } from 'formik'
import { signupSchema } from "./schema";
import { Auth } from "@/services/auth";


const initialValues = {
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
};
export default function Signup() {
  const [error, setError] = useState<string | undefined>('');
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();


  const formik = useFormik({
    initialValues,
    validationSchema: signupSchema(),
    validateOnChange: false,
    onSubmit: async (values) => {
      setLoading(true);
      const [signupError] = await Auth.signup(values);

      if (signupError) {
        setError(signupError.message)
        setLoading(false);
        return
      }
      setLoading(false);
      navigate("/login")
    }
  })
  const { errors, values } = formik;

  const handleChangeText = ( value: string, field: keyof typeof initialValues) => {
    setError('');
    formik.setFieldValue(field, value);
  }

  const handleSubmit = () => {
    formik.handleSubmit();
  }

  useEffect(() => {
    if (errors.email) return setError(errors.email);

    if (errors.email) return setError(errors.email);

    if (errors.password || errors.confirmPassword) {
      return setError(errors.password || errors.confirmPassword)
    }
  }, [errors.email, errors.password, errors.confirmPassword])

  return (
    <form>
      <div className='grid p-6 gap-5 w-96 rounded-2xl bg-[#FFCB71] '>
        <div className=' grid gap-5 w-full'>
          <Input
            type='text'
            placeholder='Name'
            value={values.name}
            onChange={({target}) => handleChangeText(target.value, 'name')}
          />
          <Input
            type='email'
            placeholder='Email'
            value={values.email}
            onChange={({target}) => handleChangeText(target.value, 'email')}
          />
          <Input
            type='password'
            placeholder='Password'
            value={values.password}
            onChange={({target}) => handleChangeText(target.value, 'password')}
          />
          <Input
            type='password'
            placeholder='Confirm password'
            value={values.confirmPassword}
            onChange={({target}) => handleChangeText(target.value, 'confirmPassword')}
          />
        </div>

        <p className='text-red-500 p-1 rounded-lg'>
          {error}
        </p>
        <div className='grid gap-1 '>
          <ButtonForm
            onClick={handleSubmit}
            type="button"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Signup'}
          </ButtonForm>
          <div className='flex gap-1 justify-center w-full text-zinc-700 font-bold'>
            <p>You have Account?</p>
            <NavLink to='/login'>Login</NavLink>
          </div>
        </div>
      </div>
      {/* <div className='absolute bottom-0 right-0 bg-zinc-400 rounded-lg p-4'>
        <p>{newUser.name}</p>
        <p>{newUser.email}</p>
        <p>{newUser.password}</p>
      </div> */}
    </form>
  );
}
