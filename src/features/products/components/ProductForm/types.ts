export type ProductFormType = "create" | "edit";

export interface ProductFormRefValue {
  getImageFile: () => File | null;
  resetImageFile: () => void;
}
