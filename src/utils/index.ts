interface ObjectAlike {
  [key: string]: string | Blob;
}

export const createFormData = <T extends ObjectAlike>(obj: T) => {
  const formData = new FormData();

  for (let property in obj) {
    formData.append(property, obj[property]);
  }

  return formData;
};
