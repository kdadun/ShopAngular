export class GlobalApp {

  constructor() {}

  public localStorageItem(key: string) {
      return localStorage.getItem(key);
  }
  public localStorageSetItem(key: string, value: any) {
    return localStorage.setItem(key, value);
  }
  public get<T> (key: string) {
    return localStorage.getItem(key);
  }
}
