export interface StorageItemAdapter<Value> {
  get: () => Value;
  set: (value: Value) => void;
  remove: () => void;
}
