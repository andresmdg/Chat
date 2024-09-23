import {jwtDecode} from 'jwt-decode'
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

  static hasExpired (token: string) {
    const { exp } = jwtDecode(token);
    const currentTime = new Date().getTime();

    if (exp && exp <= currentTime) {
      return true;
    }
    return false ;
  }
}

