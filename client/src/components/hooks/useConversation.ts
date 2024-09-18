import { useState } from "react";
import { Msn, Profile } from "../../interfaces/interfaces";

export default function useConversation() {
  // * States

  const [profile, setProfile] = useState<Profile>({
    msnAccount: "Anderson Vanhron",
    image:
      "https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144",
  });

  const [message, setMessage] = useState<string>("");

  const [msgList, setMsgList] = useState<Msn[]>([]);

  const format: Msn = {
    message,
    istMine: true,
    msnAccount: profile.msnAccount,
    date: "fecha",
    image: profile.image,
  };

  const handleSendMessage = () => {
    if (!message.trim()) return; // Avoid empty messages

    const nuevoMensaje = { ...format, message };
    setMsgList([...msgList, nuevoMensaje]);

    // setMsgList((prevMsgList) => [...prevMsgList, nuevoMensaje]);
    console.log("After setting", msgList);

    setMessage("");
  };

  return {
    // * State
    msgList,
    message,
    setMessage,
    profile,
    setProfile,
    // * function
    handleSendMessage,
  };
}
