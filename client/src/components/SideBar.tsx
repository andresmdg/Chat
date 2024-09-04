import { ButtonSetting } from "./Buttons";
import InfoAccount from "./InfoAccount";

export default function SideBar() {
  return (
    <aside className='h-full w-80 bg-[#FFF09C] text-[#9379C2] p-4 font-bold text-start grid gap-4'>
      <Settings />
    </aside>
  );
}

function Settings() {
  return (
    <>
      <InfoAccount name='Victor' email='victor@mail.com' userName='victor828' />
      <div className='grid gap-[450px]'>
        <div className='grid gap-4 '>
          <ButtonSetting texto='Account' image='.\public\icons\Account.svg' />
          <ButtonSetting texto='Messages' image='.\public\icons\Message.svg' />
          <ButtonSetting texto='Info' image='.\public\icons\Info.svg' />
        </div>
        <div className='grid gap-4'>
          <ButtonSetting
            texto='Change Account'
            image='.\public\icons\Change.svg'
          />
          <ButtonSetting texto='Logout' image='.\public\icons\Exit.svg' />
        </div>
      </div>
    </>
  );
}
