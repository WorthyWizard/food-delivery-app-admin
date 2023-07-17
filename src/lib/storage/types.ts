export interface StorageItemAdapter<Value> {
  get: () => Value;
  set: (value: Value) => void;
  remove: () => void;
}

export interface StorageItemOptions<Value, Key extends string = string> {
  storage: Storage;
  key: Key;
  initialValue: Value;
}
