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
    <div className='bg-slate-700 flex gap-2 p-2'>
      <img
        src={`${image}`}
        alt='icon'
        className='rounded-full h-11 w-11 border border-green-500 my-auto bg-fixed'
      />
      <div className='grid justify-items-start gap-2 w-full'>
        <h5 className='text-violet-500'>{name}</h5>
        <p className='text-green-600'>{message}</p>
      </div>
      <div className='grid justify-items-end gap-2'>
        <p>{date}</p>
        <p className='px-2 bg-red-400 rounded-full text-white'>
          {Number(msnAccount) <= 99 ? msnAccount : "99+"}
        </p>
      </div>
    </div>
  );
}
