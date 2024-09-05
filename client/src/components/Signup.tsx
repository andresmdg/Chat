import { useState } from "react";
import { ButtonForm } from "./Buttons";
import { handleChange } from "../utils/utils";
import { Input } from "./Login";
import { NavLink } from "react-router-dom";

export default function Signup() {
  const [inputValue, setInputValue] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rpassword, setRpassword] = useState("");

  interface NewUser {
    name: string;
    email: string;
    password: string;
  }

  const newUser: NewUser = {
    name: inputValue,
    email: email,
    password: password,
  };

  return (
    <form>
      <div className='grid p-6 gap-11 w-96 rounded-2xl bg-[#FFCB71] '>
        <Input
          tipe='text'
          placeholder='Name'
          valueText={inputValue}
          onChange={(e) => handleChange(e, setInputValue)}
        />
        <Input
          tipe='email'
          placeholder='Email'
          valueText={email}
          onChange={(e) => handleChange(e, setEmail)}
        />
        <Input
          tipe='password'
          placeholder='Password'
          valueText={password}
          onChange={(e) => handleChange(e, setPassword)}
        />
        <div className=' grid gap-2 w-full'>
          <Input
            tipe='password'
            placeholder='Repeet password'
            valueText={rpassword}
            onChange={(e) => handleChange(e, setRpassword)}
          />
          {password !== rpassword ? (
            <p className='text-white bg-red-500 p-1 rounded-lg animate-pulse '>
              The password is not the same
            </p>
          ) : (
            ""
          )}
        </div>

        <div className='grid gap-1 '>
          <ButtonForm
            title='Login'
            dis={password === rpassword ? false : true}
          />
          <div className='flex gap-1 justify-center w-full text-zinc-700 font-bold'>
            <p>You have Account?</p>
            <NavLink to='/login'>Login</NavLink>
          </div>
        </div>
      </div>
      <div className='absolute bottom-0 right-0 bg-zinc-400 rounded-lg p-4'>
        <p>{newUser.name}</p>
        <p>{newUser.email}</p>
        <p>{newUser.password}</p>
      </div>
    </form>
  );
}
