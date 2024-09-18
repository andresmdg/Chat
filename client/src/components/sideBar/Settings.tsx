import { Dispatch, SetStateAction } from "react";
import InfoAccount from "./InfoAccount";
import { ButtonSetting, ButtonSettingNav } from "../Buttons";
import { handleActive } from "../../utils/utils";
import { IoIosArrowBack } from "react-icons/io";
import { useTheme } from "../hooks/useTheme";

export default function Settings({
  settings,
  setSettings,
}: {
  settings: boolean;
  setSettings: Dispatch<SetStateAction<boolean>>;
}) {
  const { white, changeTheme } = useTheme();

  return (
    <div
      className='grid sidebar_Row w-96 gap-4 text-start p-4 h-full
    max-md:w-screen
      max-lg:w-fit
      max-2xl:w-80
      
    '>
      <div className='max-sm:flex max-sm:justify-between max-sm:items-center max-sm:gap-4'>
        <button
          onClick={() => handleActive(settings, setSettings)}
          className={`h-full w-full rounded-lg p-4 
          hidden max-sm:block
          ${white ? "bg-[#ffffff]" : "bg-yellow-50"}`}>
          <IoIosArrowBack className='h-6 w-6' />
        </button>
        <InfoAccount
          white={white}
          name='Name'
          email='user@mail.com'
          userName='User'
        />
      </div>
      {/* // * Back button */}
      <button
        onClick={() => handleActive(settings, setSettings)}
        className={`h-12 w-6 rounded-s p-0 absolute top-20 left-96 
          max-sm:hidden
          max-2xl:left-80
          ${white ? "bg-[#ffffff]" : "bg-yellow-50"}`}>
        <IoIosArrowBack />
      </button>
      <div className='grid sidebar_Button h-full content-between gap-4'>
        <section
          className={`grid gap-4 h-fit p-2 rounded-lg ${
            white ? "bg-[#ffffff]" : "bg-yellow-50"
          }`}>
          <ButtonSetting
            onclick={() => console.log("")}
            texto='Account'
            image='.\public\icons\Account.svg'
          />
          <ButtonSetting
            onclick={() => console.log("")}
            texto='Messages'
            image='.\public\icons\Message.svg'
          />
          <ButtonSetting
            onclick={() => console.log("")}
            texto='Info'
            image='.\public\icons\Info.svg'
          />
        </section>
        {/*  Section themes */}

        <section
          className={`${
            white ? "bg-[#ffffff]" : "bg-yellow-50"
          } p-2 rounded-lg text-center`}>
          <p>Temas</p>
          <div className='flex gap-2'>
            <button onClick={changeTheme} className='p-2'>
              <div className='rounded-full h-6 w-6 bg-white border border-black' />
            </button>
          </div>
        </section>
        <section
          className={`grid gap-4 p-2 h-fit rounded-lg ${
            white ? "bg-white" : "bg-yellow-50"
          }`}>
          <ButtonSetting
            onclick={() => console.log("")}
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
