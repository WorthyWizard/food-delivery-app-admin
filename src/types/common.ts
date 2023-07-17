export type FormDataAlike<T extends object> = Record<keyof T, string | Blob>;
