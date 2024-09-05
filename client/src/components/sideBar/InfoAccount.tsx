export default function InfoAccount(params: {
  name: string;
  userName: string;
  email: string;
  white: boolean;
}) {
  return (
    <div
      className={`w-72 sidebar_Info h-fit flex-col justify-start items-center gap-6 inline-flex p-2 rounded-lg ${
        params.white ? "bg-[#ffffff]" : "bg-yellow-50"
      }`}>
      <div className='self-stretch justify-start items-end gap-1 inline-flex'>
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
      <div className=' h-6 justify-center items-center gap-4 inline-flex hover:bg-[#8080804f] w-full py-1 rounded-lg group'>
        <div className='w-5 h-5 bg-green-500 rounded-full animate-ping' />
        <p className="w-20 h-4 text-slate-400 text-base font-bold font-['Roboto']">
          En linea
        </p>
        <div className='bg-[#FFF09C] w-11 h-11 absolute left-80 top-36 hidden group-hover:grid'></div>
      </div>
    </div>
  );
}
