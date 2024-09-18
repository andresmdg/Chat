interface InputProps {
  placeholder: string;
  valueText?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  tipe: string;
  add?: string; // puedes agregar estilos en el componente aparte
}

export default function AccoundField(input: InputProps) {
  //
  return (
    <div className='grid text-start rounded-2xl bg-[#FFCB71]'>
      <label
        htmlFor={input.placeholder} // se debe tener en cuenta que los nombres o place holder o se pueden repetir ya que esta enlazado al input
        className='text-zinc-700 px-2 py-1 font-bold bg-slate-50 border-b border-x-zinc-700 border-opacity-20 rounded-t-2xl'>
        {input.placeholder}
      </label>
      <input
        id={input.placeholder}
        type={input.tipe}
        placeholder={input.placeholder}
        value={input.valueText}
        onChange={input.onChange}
        className={`${input.add} px-2 py-1 w-full rounded-b-2xl text-start  bg-slate-50 text-blue-300 focus:border-none focus:text-blue-600`}
      />
    </div>
  );
}
