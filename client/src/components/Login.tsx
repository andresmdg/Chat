import { useState } from "react";
import { ButtonForm } from "./Buttons";
import { NavLink } from "react-router-dom";

export default function Login() {
  const [inputValue, setInputValue] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const handlePass = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  interface User {
    username: string;
    password: string;
  }

  const user: User = {
    username: inputValue,
    password: password,
  };

  return (
    <form>
      <div className='grid p-6 gap-11 w-96 rounded-2xl bg-[#FFCB71] '>
        <Input
          tipe='email'
          placeholder='User / Email'
          valueText={inputValue}
          onChange={handleChange}
        />
        <Input
          tipe='password'
          placeholder='Password'
          valueText={password}
          onChange={handlePass}
        />
        <div className='grid gap-1 '>
          <ButtonForm title='Login' dis={false} />
          <div className='flex gap-1 justify-center w-full text-zinc-700 font-bold'>
            <p>Dont have Account?</p>
            <NavLink to='/signup'>Signup</NavLink>
          </div>
        </div>
      </div>
      <div className='text-blue-600 font-bold'>
        <p>Validacion</p>
        <p>{user.username}</p>

        <p>{user.password}</p>
      </div>
    </form>
  );
}
// ----------------------------------------------------------------------------------
interface InputProps {
  placeholder: string;
  valueText: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  tipe: string;
}

export function Input({ placeholder, valueText, onChange, tipe }: InputProps) {
  return (
    <input
      type={tipe}
      value={valueText}
      onChange={onChange}
      placeholder={placeholder}
      className='px-2 py-1 rounded-lg text-center  bg-slate-50 text-blue-300 focus:border-none focus:text-blue-600'
    />
  );
}
