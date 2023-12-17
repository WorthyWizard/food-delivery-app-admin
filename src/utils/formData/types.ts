export type FormDataValue =
  | Blob
  | string
  | number
  | Record<string, any>
  | any[]
  | null
  | undefined;

export type FormDataAlike<T extends Record<string, any>> = Partial<
  Record<keyof T, FormDataValue>
>;
