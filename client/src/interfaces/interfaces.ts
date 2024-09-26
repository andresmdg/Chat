export interface Msn {
  message: string;
  msnAccount?: string;
  date: string;
  image?: string;
  istMine: boolean;
}

export interface IShowMsn {
  msgList: Msn[];
  // setMsgList: React.Dispatch<React.SetStateAction<Msn[]>>;
}

export interface BoxChatI {
  name: string;
  nickName: string;
  image: string;
}

export interface Profile {
  msnAccount: string;
  image: string;
}

export interface User {
  id: string,
  name: string,
  username: string | null,
  avatarUrl: string | null
}
export interface UserResponse {
  success: boolean,
  user: User
}