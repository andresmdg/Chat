import Settings from "./Settings";
import Chats from "./Chats";
import { useState } from "react";
import { useTheme } from "../hooks/useTheme";

export default function SideBar() {
  const {white} = useTheme()
  const [settings, setSettings] = useState(false);

  return (
    <aside
      className={`h-full max-h-screen ${
        white ? "bg-[#f3f3f3]" : "bg-[#FFF09C]"
      } text-violet-300  font-bold relative`}>
      <Settings
        settings={settings}
        setSettings={setSettings}
      />
      <Chats setting={settings} setChats={setSettings} />
    </aside>
  );
}
