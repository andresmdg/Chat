import { Dispatch, SetStateAction, useState } from "react";
import { handleActive, handleChange, messages } from "../../utils/utils";
import { FaHamburger } from "react-icons/fa";
import { LuSettings2 } from "react-icons/lu";
import { Input } from "../Login";
import ChatCard from "../ChatCard";

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
          <FaHamburger />
        </button>
      </div>
      <section className='flex w-full h-fit'>
        <LuSettings2 className='w-10 h-10' />
        <Input
          tipe='text'
          placeholder='Search'
          valueText={search}
          onChange={(e) => handleChange(e, setsearch)}
        />
      </section>
      <section className='h-full overflow-y-auto scroll_stile'>
        {/* Aqui se hara el mapeo */}
        {messages.map((msn) => {
          return (
            <ChatCard
              image=''
              name={msn.name}
              date={msn.date}
              message='Hooli hooli'
              msnAccount={msn.msnAccount}
            />
          );
        })}
      </section>
    </div>
  );
}
