import BoxChat from "../BoxChat/BoxChat";
import SideBar from "../sideBar/SideBar";

export default function HomeView() {
  return (
    <div className='backgrundpg bg-light-green h-screen w-screen grid grid-cols-[auto_1fr]'>
      <SideBar />
      <BoxChat
        name='Anderson Vanhron'
        nickName='Junior Developer'
        image='https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144'
      />
    </div>
  );
}
