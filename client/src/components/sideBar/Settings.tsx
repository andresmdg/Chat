import { Dispatch, SetStateAction } from "react";
import InfoAccount from "./InfoAccount";
import { ButtonSetting, ButtonSettingNav } from "../Buttons";
import { handleActive } from "../../utils/utils";
import { IoIosArrowBack } from "react-icons/io";

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
      <button
        onClick={() => handleActive(settings, setSettings)}
        className={`h-12 w-6 rounded-s p-0 absolute top-20 left-80 ${
            white ? "bg-[#ffffff]" : "bg-yellow-50"
          }`}>
        <IoIosArrowBack />
      </button>
      <div className='grid sidebar_Button h-full content-between'>
        <section
          className={`grid gap-4 h-fit p-2 rounded-lg ${
            white ? "bg-[#ffffff]" : "bg-yellow-50"
          }`}>
          <ButtonSetting texto='Account' image='.\public\icons\Account.svg' />
          <ButtonSetting texto='Messages' image='.\public\icons\Message.svg' />
          <ButtonSetting texto='Info' image='.\public\icons\Info.svg' />
        </section>

        {/* Section themes */}
        <section
          className={`${
            white ? "bg-[#ffffff]" : "bg-yellow-50"
          } p-2 rounded-lg text-center`}>
          <p>Temas</p>
          <div className='flex gap-2'>
            <button
              onClick={() => {
                handleActive(white, setWhite);
                window.localStorage.setItem("theme", "white");
              }}
              className='p-2'>
              <div className='rounded-full h-6 w-6 bg-white border border-black' />
            </button>
            <button
              onClick={() => {
                handleActive(white, setWhite);
                window.localStorage.setItem("theme", "white");
              }}
              className='p-2'>
              <div className='rounded-full h-6 w-6 bg-white border border-black' />
            </button>
          </div>
        </section>

        <section
          className={`grid gap-4 p-2 rounded-lg ${
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
        </section>
      </div>
    </div>
  );
}
