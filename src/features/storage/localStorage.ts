import { StorageItemAdapter } from "./types";

class LocalStorageItem<Value, Key extends string = string>
  implements StorageItemAdapter<Value>
{
  constructor(private key: Key, private value: Value) {
    const storageItem = this.get();
    if (!storageItem) {
      this.set(this.value);
    }
  }

  get() {
    return JSON.parse(localStorage.getItem(this.key)!) as Value;
  }

  set(value: Value) {
    localStorage.setItem(this.key, JSON.stringify(value));
  }

  remove() {
    localStorage.removeItem(this.key);
  }
}

export default LocalStorageItem;
