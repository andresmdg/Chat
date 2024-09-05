import { Dispatch, SetStateAction } from "react";
import InfoAccount from "./InfoAccount";
import { ButtonSetting, ButtonSettingNav } from "../Buttons";
import { handleActive } from "../../utils/utils";

export default function Settings({
  settings,
  setSettings,
  white,
  setWhite,
}: {
  settings: boolean;
  setSettings: Dispatch<SetStateAction<boolean>>;
  white: boolean;
  setWhite: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div className='grid sidebar_Row'>
      <InfoAccount
        white={white}
        name='Name'
        email='user@mail.com'
        userName='User'
      />
      <div className='grid sidebar_Button h-full content-between'>
        <div
          className={`grid gap-4 h-fit p-2 rounded-lg ${
            white ? "bg-[#ffffff]" : "bg-yellow-50"
          }`}>
          <ButtonSetting texto='Account' image='.\public\icons\Account.svg' />
          <ButtonSetting
            onclick={() => handleActive(settings, setSettings)}
            texto='Messages'
            image='.\public\icons\Message.svg'
          />
          <ButtonSetting texto='Info' image='.\public\icons\Info.svg' />
        </div>
        <div className={`${white ? "bg-[#ffffff]" : "bg-yellow-50"}`}>
          <p>Temas</p>
          <button
            onClick={() => {
              handleActive(white, setWhite);
              window.localStorage.setItem("white", String(white));
            }}
            className='p-2'>
            <div className='rounded-full h-6 w-6 bg-white border border-black'></div>
          </button>
        </div>
        <div
          className={`grid gap-4 p-2 h-fit rounded-lg ${
            white ? "bg-[#ffffff]" : "bg-yellow-50"
          }`}>
          <ButtonSetting
            texto='Change Account'
            image='.\public\icons\Change.svg'
          />
          <ButtonSettingNav
            goTo='/login'
            texto='Logout'
            image='.\public\icons\Exit.svg'
          />
        </div>
      </div>
    </div>
  );
}
