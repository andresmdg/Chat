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
      <div className='grid w-full'>
        <div className='flex w-full content-between h-full'>
          <h5 className='text-violet-500 p-0 h-fit'>{name}</h5>
          <p>{date}</p>
        </div>
        <div className='flex gap-2'>
          <p className='text-green-600 content-between p-0 h-6 overflow-hidden'>{message}</p>
          <p className='px-2 bg-red-400 rounded-full text-white'>
            {Number(msnAccount) <= 99 ? msnAccount : "99+"}
          </p>
        </div>
      </div>
    </button>
  );
}
