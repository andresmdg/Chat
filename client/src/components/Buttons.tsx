import { useAuth } from "./hooks/useAuth";

type ButtonFormProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function ButtonForm({children, ...rest}: ButtonFormProps) {
  return (
    <button
      className='bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px cursor-pointer disabled:bg-blue-100 disabled:text-blue-400'
      {...rest}
    >
      <h5>{children}</h5>
    </button>
  );
}

export function LogoutButton(params: {
  image: string;
  texto: string;
}) {

  const {logout} = useAuth();
  return (
    <button
      onClick={logout}
      className='cursor-pointer group border-none hover:border-none flex gap-2 w-full bg-inherit m-0 p-0 hover:bg-[#8989893d] hover:transition-all hover:duration-300'>
      <img src={params.image} alt={params.texto} />
      <div className='grid gap-2 w-full text-start mt-auto'>
        <p>{params.texto}</p>
        <hr className='group-hover:opacity-0' />
      </div>
    </button>
  );
}

export function ButtonSetting(params: {
  image: string;
  texto: string;
  onclick: () => void;
}) {
  return (
    <button
      onClick={params.onclick}
      className='cursor-pointer group border-none hover:border-none flex gap-2 w-full bg-inherit m-0 p-0 hover:bg-[#8989893d] hover:transition-all hover:duration-300'>
      <img src={params.image} alt={params.texto} />
      <div className='grid gap-2 w-full text-start mt-auto'>
        <p>{params.texto}</p>
        <hr className='group-hover:opacity-0' />
      </div>
    </button>
  );
}
