export const createFormData = <T extends object>(
  source: Record<keyof T, string | Blob>
): FormData => {
  const formData = new FormData();

  for (const property in source) {
    formData.append(property, source[property]);
  }

  return formData;
};
