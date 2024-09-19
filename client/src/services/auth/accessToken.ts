import { LocalStorage } from "@/utils/localStorage"

export class AccessToken {
  static async set (token: string) {
    LocalStorage.setItem('ACCESS_TOKEN', token);
  }

  static async get () {
    return LocalStorage.getItem('ACCESS_TOKEN');
  }

  static async remove () {
    LocalStorage.removeItem('ACCESS_TOKEN');
  }
}