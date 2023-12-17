export const parseFormData = <T extends Record<string, any>>(
  formData: FormData,
): T => {
  const obj: { [key: string]: any } = {};

  for (const pair of formData.entries()) {
    const key = pair[0];
    const value = pair[1];

    obj[key] = value instanceof File ? value : JSON.parse(value);
  }

  return obj as T;
};
