import Settings from "./Settings";
import Chats from "./Chats";
import { useEffect, useState } from "react";

export default function SideBar() {
  const [settings, setSettings] = useState(false);
  const [white, setWhite] = useState(false);

  useEffect(() => {
    const themeWhite = window.localStorage.getItem("white");
    if (themeWhite === "true") {
      setWhite(true);
    }
  }, [white]);

  return (
    <aside
      className={`h-full w-80 ${
        white ? "bg-[#f3f3f3]" : "bg-[#FFF09C]"
      } text-[#9379C2]  font-bold  ${
        settings ? "grid gap-4 text-start p-4" : "ps-2"
      } `}>
      {settings ? (
        <Settings
          settings={settings}
          setSettings={setSettings}
          white={white}
          setWhite={setWhite}
        />
      ) : (
        <Chats setting={settings} setChats={setSettings} />
      )}
    </aside>
  );
}
