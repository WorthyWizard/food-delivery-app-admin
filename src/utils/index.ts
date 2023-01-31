export const createFormData = <T extends object>(
  source: Record<keyof T, string | Blob>
): FormData => {
  const formData = new FormData();

  for (let property in source) {
    formData.append(property, source[property]);
  }

  return formData;
};
