export class LocalStorage {
  static setItem (key: string, value: unknown) {
    const data = JSON.stringify(value);
    window.localStorage.setItem(key, data);
  }

  static getItem (key: string) {
    const data = window.localStorage.getItem(key);
    if (data) return JSON.parse(data);
    return null;
  }
}