import { Dispatch, SetStateAction, useState } from "react";
import { handleActive, handleChange, messages } from "../../utils/utils";
import { Input } from "../Login";
import ChatCard from "./ChatCard";
import { GiHamburgerMenu } from "react-icons/gi";
import TapBar from "./Tapbar";
import { Route, Routes } from "react-router-dom";

interface ChatI {
  setting: boolean;
  setChats: Dispatch<SetStateAction<boolean>>;
}

export default function Chats({ setting, setChats }: ChatI) {
  const [search, setsearch] = useState("");
  const [tap, setTap] = useState("group");

  // function renderChats() {
  //   switch (tap) {
  //     case "group":
  //       return <GroupChat />;
  //     case "private":
  //       return <PrivateChat />;
  //     case "people":
  //       return <People />;
  //     default:
  //       return null;
  //   }
  // }

  function renderSearchResults() {
    return messages
      .filter((msn) => msn.name.toLowerCase().includes(search.toLowerCase()))
      .map((msn) => {
        return (
          <ChatCard
            key={msn.msnAccount}
            image=''
            name={msn.name}
            date={msn.date}
            message='Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi saepe id eveniet minus, accusantium fuga neque earum nisi! Aliquid harum consectetur vel doloremque fugit dicta, magnam facere molestiae minus possimus.'
            msnAccount={msn.msnAccount}
          />
        );
      });
  }

  return (
    <div
      className='h-full grid gap-2 sd_default 
      max-md:w-screen
      max-lg:w-64
      max-2xl:w-80
      w-96
    
    '>
      <div className='flex justify-between h-fit m-2'>
        <p className='text-3xl'>Chats</p>

        {/* // * Menu button */}
        <button
          onClick={() => handleActive(setting, setChats)}
          className={`${setting ? "hidden" : "h-fit w-fit bg-white"}
           `}>
          <GiHamburgerMenu />
        </button>
      </div>

      {/* // * Search bar */}
      <section className='flex w-full h-fit m-'>
        <Input
          add='mx-4'
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
            <Routes>
              <Route path='/group' element={<GroupChat />} />
              <Route path='/private' element={<PrivateChat />} />
              <Route path='/people' element={<People />} />
            </Routes>
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
        return (
          <ChatCard
            key={msn.msnAccount}
            image=''
            name={msn.name}
            date={msn.date}
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
