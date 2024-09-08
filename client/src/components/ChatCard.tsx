import formatTime from "../utils/date";

export default function ChatCard({
  name,
  message,
  msnAccount,
  date,
  image,
}: {
  name: string;
  message: string;
  msnAccount: string;
  date: string;
  image: string;
}) {
  return (
    <button className=' bg-inherit btn_cat hover:bg-[#8989893d] flex gap-2 p-2 w-full'>
      <img
        src={`${image}`}
        alt='icon'
        className='rounded-full h-11 w-11 border border-green-500 my-auto bg-fixed'
      />
      <div className='grid justify-items-start items-end w-full h-full'>
        <h5 className='text-violet-500 p-0 h-fit'>{name}</h5>
        <p className='text-green-600 p-0 h-fit'>{message}</p>
      </div>
      <div className='grid justify-items-end gap-2'>
        <p>{formatTime(new Date(date))}</p>
        <p className='px-2 bg-red-400 rounded-full text-white'>
          {Number(msnAccount) <= 99 ? msnAccount : "99+"}
        </p>
      </div>
    </button>
  );
}
