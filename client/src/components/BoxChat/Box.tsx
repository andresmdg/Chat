import InputMessage from "./InputMessage";

export default function Box() {
  return (
    <div className='h-full w-full border border-black rounded-lg p-2 m-2 backdrop-blur-sm chatBox'>
      <h1>Box</h1>
      <InputMessage />
    </div>
  );
}
