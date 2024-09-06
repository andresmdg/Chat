import { Dispatch, SetStateAction } from "react";
import { FaPeopleArrows } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import { GoPeople } from "react-icons/go";
import { handleChangeValue } from "../../utils/utils";

interface Btn {
  name: string;
  root: string;
  icon: JSX.Element;
}

const buttons: Btn[] = [
  {
    name: "Group",
    root: "group",
    icon: <FaPeopleGroup />,
  },
  {
    name: "Private",
    root: "private",
    icon: <FaPeopleArrows />,
  },
  {
    name: "People",
    root: "people",
    icon: <GoPeople />,
  },
];

interface TapBarProps {
  theme: boolean;
  tap: string;
  setTap: Dispatch<SetStateAction<string>>;
}

export default function TapBar({ tap, setTap }: TapBarProps) {
  return (
    <div className='w-full'>
      <div className='w-full'>
        <nav aria-label='Tabs' className='flex w-full content-between'>
          {buttons.map((button) => (
            <ButtonTapbar
              key={button.root}
              taps={tap}
              setTap={setTap}
              icon={button.icon}
              name={button.name}
              root={button.root}
            />
          ))}
        </nav>
      </div>
    </div>
  );
}

interface ButtonTapbarProps extends Btn {
  taps: string;
  setTap: Dispatch<SetStateAction<string>>;
}

function ButtonTapbar({ taps, setTap, name, root, icon }: ButtonTapbarProps) {
  return (
    <button
      onClick={() => handleChangeValue(root, setTap)}
      className={`${
        (taps === root) ? "bg-yellow-50 " : "bg-none"
      } w-full grid justify-items-center py-1
      ${taps ? "hover:bg-white" : "hover:bg-yellow-50"} `}>
      {icon}
      <span>{name}</span>
    </button>
  );
}
