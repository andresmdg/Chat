import { Dispatch, SetStateAction, useState } from "react";
import { handleActive, handleChange, messages } from "../../utils/utils";
import { Input } from "../Login";
import ChatCard from "../ChatCard";
import { GiHamburgerMenu } from "react-icons/gi";

export default function Chats({
  setting,
  setChats,
}: {
  setting: boolean;
  setChats: Dispatch<SetStateAction<boolean>>;
}) {
  const [search, setsearch] = useState("");
  return (
    <div className='h-full grid gap-2 sd_default'>
      <div className='flex justify-between h-fit m-2'>
        <p className='text-3xl'>Chats</p>
        <button
          onClick={() => handleActive(setting, setChats)}
          className={`${
            setting ? "hidden" : "h-fit w-fit bg-white"
          } transition-all `}>
          <GiHamburgerMenu />
        </button>
      </div>
      <section className='flex w-full h-fit'>
        <Input
          add='mr-2'
          tipe='text'
          placeholder='Search'
          valueText={search}
          onChange={(e) => handleChange(e, setsearch)}
        />
      </section>
      <section className='h-full overflow-y-auto scroll_stile'>
        {/* Aqui se hara el mapeo */}
        {messages.map((msn) => {
          const fecha = msn.date.split("-");
          return (
            <ChatCard
              image=''
              name={msn.name}
              date={`${fecha[0]}/${fecha[1]}/${fecha[2].slice(0, 2)}`}
              message='Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi saepe id eveniet minus, accusantium fuga neque earum nisi! Aliquid harum consectetur vel doloremque fugit dicta, magnam facere molestiae minus possimus.'
              msnAccount={msn.msnAccount}
            />
          );
        })}
      </section>
    </div>
  );
}
