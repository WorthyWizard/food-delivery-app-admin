import { FormDataAlike } from "./types";

export const createFormData = <T extends Record<string, any>>(
  source: FormDataAlike<T>,
): FormData => {
  const formData = new FormData();

  for (const property in source) {
    const value = source[property];

    if (value instanceof Blob) {
      formData.append(property, value);
    } else if (value === undefined) {
      continue;
    } else {
      formData.append(property, JSON.stringify(value));
    }
  }

  return formData;
};
