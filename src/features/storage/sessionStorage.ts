import { StorageItemAdapter } from "./types";

class SessionStorageItem<V, K extends string = string>
  implements StorageItemAdapter<V>
{
  constructor(private key: K, private value: V) {
    const storageItem = this.get();
    if (!storageItem) {
      this.set(this.value);
    }
  }

  get() {
    return JSON.parse(sessionStorage.getItem(this.key)!) as V;
  }

  set(value: V) {
    sessionStorage.setItem(this.key, JSON.stringify(value));
  }

  remove() {
    sessionStorage.removeItem(this.key);
  }
}

export default SessionStorageItem;
