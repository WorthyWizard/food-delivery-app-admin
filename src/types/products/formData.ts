export interface EditProductFormData {
  title?: string;
  description?: string;
  price?: number | string | null;
  rating?: number | string | null;
  discount?: number | string | null;
}

export interface CreateProductFormData {
  title: string;
  description: string;
  price: number | string;
  rating?: number | string | null;
  discount?: number | string | null;
}
