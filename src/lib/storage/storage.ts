import { StorageItemAdapter, StorageItemOptions } from "./types";

export class StorageItem<Value, Key extends string = string>
  implements StorageItemAdapter<Value>
{
  constructor(private options: StorageItemOptions<Value, Key>) {
    const { initialValue } = options;

    const storageItem = this.get();

    if (!storageItem) {
      this.set(initialValue);
    }
  }

  get() {
    const { storage, key } = this.options;

    return JSON.parse(storage.getItem(key)!) as Value;
  }

  set(value: Value) {
    const { storage, key } = this.options;

    storage.setItem(key, JSON.stringify(value));
  }

  remove() {
    const { storage, key } = this.options;

    storage.removeItem(key);
  }
}
