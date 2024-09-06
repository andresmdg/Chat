import { Dispatch, SetStateAction, useState } from "react";
import { handleActive, handleChange, messages } from "../../utils/utils";
import { Input } from "../Login";
import ChatCard from "./ChatCard";
import { GiHamburgerMenu } from "react-icons/gi";
import TapBar from "./Tapbar";

interface ChatI {
  setting: boolean;
  setChats: Dispatch<SetStateAction<boolean>>;
}

export default function Chats({ setting, setChats }: ChatI) {
  const [search, setsearch] = useState("");
  const [tap, setTap] = useState("group");

  function renderChats() {
    switch (tap) {
      case "group":
        return <GroupChat />;
      case "private":
        return <PrivateChat />;
      case "people":
        return <People />;
      default:
        return null;
    }
  }

  function renderSearchResults() {
    return messages
      .filter((msn) => msn.name.toLowerCase().includes(search.toLowerCase()))
      .map((msn) => {
        const fecha = msn.date.split("-");
        return (
          <ChatCard
            key={msn.msnAccount}
            image=''
            name={msn.name}
            date={`${fecha[0]}/${fecha[1]}/${fecha[2].slice(0, 2)}`}
            message='Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi saepe id eveniet minus, accusantium fuga neque earum nisi! Aliquid harum consectetur vel doloremque fugit dicta, magnam facere molestiae minus possimus.'
            msnAccount={msn.msnAccount}
          />
        );
      });
  }

  return (
    <div className='h-full grid gap-2 sd_default w-96'>
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

      {search !== "" ? (
        <section className='h-full overflow-y-auto scroll_stile'>
          {renderSearchResults()}
        </section>
      ) : (
        <>
          <section>
            <TapBar tap={tap} setTap={setTap} theme={setting} />
          </section>

          <section className='h-full overflow-y-auto scroll_stile'>
            {renderChats()}
          </section>
        </>
      )}
    </div>
  );
}

function PrivateChat() {
  return (
    <>
      {messages.map((msn) => {
        const fecha = msn.date.split("-");
        return (
          <ChatCard
            key={msn.msnAccount}
            image=''
            name={msn.name}
            date={`${fecha[0]}/${fecha[1]}/${fecha[2].slice(0, 2)}`}
            message='Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi saepe id eveniet minus, accusantium fuga neque earum nisi! Aliquid harum consectetur vel doloremque fugit dicta, magnam facere molestiae minus possimus.'
            msnAccount={msn.msnAccount}
          />
        );
      })}
    </>
  );
}

function GroupChat() {
  return (
    <div>
      <p>Group chat content goes here.</p>
    </div>
  );
}

function People() {
  return (
    <div>
      <p>People content goes here.</p>
    </div>
  );
}
