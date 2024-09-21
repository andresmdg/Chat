import { useAuth } from "../hooks/useAuth";

export default function InfoAccount(params: {
  name: string;
  userName: string;
  email: string;
  white: boolean;
}) {

  const {user} = useAuth();

  return (
    <div
      className={`w-full sidebar_Info h-fit flex-col justify-start items-center gap-6 inline-flex p-2 rounded-lg ${
        params.white ? "bg-[#ffffff]" : "bg-yellow-50"
      }`}>
      <div className='flex justify-around w-full items-center gap-3'>
        <div className='w-24 h-24 aspect-square justify-center items-center flex'>
          <img
            className='w-24 h-24 rounded-full border-2 border-teal-900'
            src='https://via.placeholder.com/100x98'
          />
        </div>
        <div className='w-full flex-col justify-start items-start gap-2 inline-flex'>
          <div className="self-stretch h-4 text-slate-400 text-base font-normal font-['Inter']">
            {user?.name}
          </div>

          {
            user?.username && (
              <p className="self-stretch h-4 text-slate-400 text-base font-normal font-['Inter']">
                { `<${user?.username}>`}
              </p>
            )
          }
          <p className="text-slate-400 text-base font-normal font-['Inter']">
            {`<${user?.email}>`}
          </p>
        </div>
      </div>
      <div className=' h-6 justify-center items-center gap-4 inline-flex hover:bg-[#8080804f] w-full py-1 rounded-lg group'>
        <div className='w-2 h-2 bg-green-500 rounded-full animate-ping' />
        <p className="w-20 h-4 text-slate-400 text-base font-bold font-['Roboto']">
          En linea
        </p>
        <div className='bg-[#FFF09C] w-11 h-11 absolute left-[103%] hidden group-hover:grid'></div>
      </div>
    </div>
  );
}
