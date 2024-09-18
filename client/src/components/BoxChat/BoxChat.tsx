import { BoxChatI, IShowMsn, Msn } from "../../interfaces/interfaces";
import useConversation from "../hooks/useConversation";
import InputMessage from "./InputMessage";

// import Box from "./Box";

export default function BoxChat(params: BoxChatI) {
  const { msgList } = useConversation();
  return (
    <div className='flex-1 p:2 sm:p-6 justify-between flex flex-col h-screen'>
      <div className='flex sm:items-center justify-between py-3 border-b-2 border-gray-200'>
        <div className='relative flex items-center space-x-4'>
          <div className='relative'>
            <span className='absolute text-green-500 right-0 bottom-0'>
              <svg width='20' height='20'>
                <circle cx='8' cy='8' r='8' fill='currentColor'></circle>
              </svg>
            </span>
            <img
              //   src='https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144'
              src={params.image}
              alt='image profile'
              className='w-10 sm:w-16 h-10 sm:h-16 rounded-full'
            />
          </div>
          <div className='flex flex-col leading-tight'>
            <div className='text-2xl mt-1 flex items-center'>
              <span className='text-gray-700 mr-3'>{params.name}</span>
              {/* <span className='text-gray-700 mr-3'>Anderson Vanhron</span> */}
            </div>
            <span className='text-lg text-gray-600'>{params.nickName}</span>
            {/* <span className='text-lg text-gray-600'>Junior Developer</span> */}
          </div>
        </div>

      </div>
      <div
        id='messages'
        className='flex h-full flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch'>
        <ShowMessages msgList={msgList} />
        {/* <ShowMessages msgList={msgList} setMsgList={setMsgList} /> */}
      </div>
      <InputMessage />
    </div>
  );
}

function ShowMessages({ msgList }: IShowMsn) {
  
  return (
    <div>
      <h1>ShowMessages</h1>
      {msgList.map((msg, i) => {
        return (
          <div key={i}>
            {!msg.istMine ? (
              <MessageCardLeft
                message='Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi saepe id eveniet minus, accusantium fuga neque earum nisi! Aliquid harum consectetur vel doloremque fugit dicta, magnam facere molestiae minus possimus.'
                msnAccount='Anderson Vanhron'
                date='11:00'
                image='https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144'
                istMine={true}
              />
            ) : (
              <MessageCardRight
                message='Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi saepe id eveniet minus, accusantium fuga neque earum nisi! Aliquid harum consectetur vel doloremque fugit dicta, magnam facere molestiae minus possimus.'
                msnAccount='Anderson Vanhron'
                date='11:35'
                image='https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144'
                istMine={false}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

function MessageCardLeft(params: Msn) {
  return (
    <div className='chat-message'>
      <div className='flex items-end mt-4'>
        <div className='flex flex-col space-y-2 text-xl mr-40 mx-2 order-2 items-start bg-zinc-700 rounded-e-3xl rounded-ss-3xl'>
          <div>
            <span className='px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600'>
              {params.message}
              <span className='w-full block text-right text-base'>
                {params.date}
              </span>
              {/* <span>hora/fecha</span> */}
            </span>
          </div>
        </div>
        <img
          src={params.image}
          //   src='https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144'
          alt='My profile'
          className='w-14 h-14 rounded-full order-1'
        />
      </div>
    </div>
  );
}

function MessageCardRight(params: Msn) {
  return (
    <div className='flex items-end justify-end mt-4'>
      <div className='flex flex-col space-y-2 text-xl ml-40 mx-2 order-1 items-end'>
        <div>
          <span className='px-4 py-2 rounded-3xl inline-block rounded-br-none bg-blue-600 text-white '>
            {params.message}
            <span className='w-full block text-right text-base'>
              {params.date}
            </span>
          </span>
          {/* <span>hora/fecha</span> */}
        </div>
      </div>
      <img
        src={params.image}
        // src='https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144'
        alt='My profile'
        className='w-6 h-6 rounded-full order-2'
      />
    </div>
  );
}
