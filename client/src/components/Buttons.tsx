import { Link } from "react-router-dom";

export function ButtonForm(params: { title: string; dis: boolean }) {
  return (
    <button
      disabled={params.dis}
      className='bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px cursor-pointer disabled:bg-blue-100 disabled:text-blue-400'>
      <h5>{params.title}</h5>
    </button>
  );
}

export function ButtonSettingNav(params: {
  image: string;
  texto: string;
  goTo: string;
}) {
  return (
    <Link
      to={params.goTo}
      className=' cursor-pointer flex gap-2 w-full bg-inherit m-0 p-0 hover:bg-[#8989893d] hover:border-none hover:scale-110 hover:transition-all hover:duration-500'>
      <img src={params.image} alt={params.texto} />
      <div className='grid gap-2 w-full text-start mt-auto'>
        <p>{params.texto}</p>
        <hr className='hover:w-0' />
      </div>
    </Link>
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
      className='cursor-pointer group border-none hover:border-none flex gap-2 w-full bg-inherit m-0 p-0 hover:bg-[#8989893d] hover:scale-105 hover:transition-all hover:duration-300'>
      <img src={params.image} alt={params.texto} />
      <div className='grid gap-2 w-full text-start mt-auto'>
        <p>{params.texto}</p>
        <hr className='group-hover:opacity-0' />
      </div>
    </button>
  );
}
