import { useEffect, useState } from "react";
import { ButtonForm } from "@/components/Buttons";
import { Input } from "@/components/Input";
import { NavLink, useNavigate } from "react-router-dom";
import { useFormik } from 'formik'
import { useDebounce } from '@uidotdev/usehooks';
import { signupSchema } from "./schema";
import { Auth } from "@/services/auth";


const initialValues = {
  name: '',
  username: '',
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

  const debouncedUsername = useDebounce(values.username, 500);

  useEffect(() => {
    if (debouncedUsername) {
      Auth.checkUsername(debouncedUsername).then((res) => {
        if (res) {
          setError('username already exists')
        }
      })
    }
  }, [debouncedUsername])

  const handleChangeText = ( value: string, field: keyof typeof initialValues) => {
    setError('');
    formik.setFieldValue(field, value);
  }

  const handleSubmit = () => {
    formik.handleSubmit();
  }

  useEffect(() => {

    if (errors.username && errors.name && errors.password) {
      return setError('Complete todos los campos');
    }
    if (errors.username) return setError(errors.username);

    if (errors.password || errors.confirmPassword) {
      return setError(errors.password || errors.confirmPassword)
    }
  }, [errors.username, errors.password, errors.confirmPassword, errors.name])

  return (
    <form>
      <div className='grid p-6 gap-5 w-96 rounded-2xl bg-[#FFCB71] '>
        <div className=' grid gap-5 w-full'>
          <Input
            type='text'
            className={`${errors.name && 'border-red-500'}`}
            placeholder='Name'
            value={values.name}
            onChange={({target}) => handleChangeText(target.value, 'name')}
          />
          <Input
            type='text'
            className={`${errors.username && 'border-red-500'}`}
            placeholder='Username'
            value={values.username}
            onChange={({target}) => handleChangeText(target.value, 'username')}
          />
          <Input
            type='password'
            className={`${errors.password && 'border-red-500'}`}
            placeholder='Password'
            value={values.password}
            onChange={({target}) => handleChangeText(target.value, 'password')}
          />
          <Input
            type='password'
            className={`${errors.confirmPassword && 'border-red-500'}`}
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
