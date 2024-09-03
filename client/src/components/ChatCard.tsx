export default function ChatCard({
  name,
  message,
  msnAccount,
  date,
}: {
  name: string;
  message: string;
  msnAccount: string;
  date: string;
}) {
  return (
    <div className='bg-slate-700 flex gap-2 p-2'>
      <img
        src=''
        alt='icon'
        className='rounded-full h-11 w-11 border border-green-500 my-auto'
      />
      <div className='grid justify-items-start gap-2'>
        <h5 className='text-violet-500'>{name}</h5>
        <p className='text-green-600'>{message}</p>
      </div>
      <div className='grid justify-items-end gap-2'>
        <p>{date}</p>
        <p className='px-2 bg-red-400 rounded-full'>
          {Number(msnAccount) <= 99 ? msnAccount : "99+"}
        </p>
      </div>
    </div>
  );
}
