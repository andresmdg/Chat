import { type User } from "@/interfaces/interfaces";
import { LocalStorage } from "@/utils/localStorage";

export class UserStorage {
  static async set (userData: User) {
    LocalStorage.setItem('USER', userData);
  }

  static async get () {
    return LocalStorage.getItem('USER') as User | null;
  }

  static async remove () {
    LocalStorage.removeItem('USER');
  }
}