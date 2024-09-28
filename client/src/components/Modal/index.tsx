import React from 'react'
import { useTheme } from '../hooks/useTheme';

interface Props {
  children: React.ReactNode,
  open: boolean,
  setOpen: (open: boolean) => void,
}
export default function Modal({open, setOpen, children}: Props) {
  const {white} = useTheme()
  const onClose = () => setOpen(false);

  return (
    <dialog
      open={open}
      className="fixed inset-0 z-10 overflow-y-auto bg-zinc-700/50"
    >
        <div className="flex justify-center items-center p-4 h-screen w-screen bg-black/50">
          <div className={`${white ? 'bg-slate-50' : 'bg-light-yellow'} p-4 rounded-lg w-full h-full max-w-[600px] max-h-[550px] relative`}>
            <button
              className="absolute right-0 top-0 text-zinc-700"
              onClick={onClose}
            >
              X
            </button>
            {children}
          </div>
        </div>
    </dialog>
  )
}
