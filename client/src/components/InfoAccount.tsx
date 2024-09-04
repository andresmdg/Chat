export default function InfoAccount(params: {
  name: string;
  userName: string;
  email: string;
}) {
  return (
    <div className='w-72 h-36 flex-col justify-start items-center gap-6 inline-flex'>
      <div className='self-stretch justify-start items-end gap-6 inline-flex'>
        <div className='w-24 h-24 justify-center items-center flex'>
          <img
            className='w-24 h-24 rounded-full border-2 border-teal-900'
            src='https://via.placeholder.com/100x98'
          />
        </div>
        <div className='w-44 flex-col justify-start items-start gap-2 inline-flex'>
          <div className="self-stretch h-4 text-slate-400 text-base font-normal font-['Inter']">
            {params.name}
          </div>
          <p className="self-stretch h-4 text-slate-400 text-base font-normal font-['Inter']">
            {`<${params.userName}>`}
          </p>
          <p className="text-slate-400 text-base font-normal font-['Inter']">
            {`<${params.email}>`}
          </p>
        </div>
      </div>
      <div className='w-40 h-6 justify-center items-center gap-4 inline-flex'>
        <div className='w-5 h-5 bg-green-500 rounded-full' />
        <p className="w-20 h-4 text-slate-400 text-base font-bold font-['Roboto']">
          En linea
        </p>
      </div>
    </div>
  );
}
