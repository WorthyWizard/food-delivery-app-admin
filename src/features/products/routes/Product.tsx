import { useEffect, useRef } from "react";

import { SelectableOption, useForm } from "@/features/form";
import { useRouterParams } from "@/hooks";

import { useCreateProduct, useUpdateProduct } from "../api";
import { useGetProduct } from "../api/getProduct";
import { ProductStatuses, productStatusesMap } from "../common";
import { ProductForm, ProductFormRefValue } from "../components";
import { CreateProduct } from "../types";
import { ProductFormData, ProductSchema } from "../validation";

interface Props {
  type: "create" | "edit";
}

export const Product = (props: Props) => {
  const { type } = props;

  const { productId } = useRouterParams();

  const productFormStateRef = useRef<ProductFormRefValue>(null);

  const form = useForm<ProductFormData>({
    validationSchema: ProductSchema,
    defaultValues: {
      description: "",
      discount: "",
      status: String(productStatusesMap.DRAFT),
      price: "",
      rating: "",
      title: "",
      categories: [],
      image: null,
    },
  });

  const { handleSubmit, reset } = form;

  const product = useGetProduct({
    id: productId!,
    config: {
      enabled: type === "edit" && Boolean(productId),
    },
  });

  const updateProduct = useUpdateProduct({
    config: {
      onSuccess: () => {
        productFormStateRef.current?.resetImageFile();
      },
    },
  });
  const createProduct = useCreateProduct({
    config: {
      onSuccess: () => {
        reset();
        createProduct.reset();
        productFormStateRef.current?.resetImageFile();
      },
    },
  });

  useEffect(() => {
    if (type === "edit" && product.isSuccess) {
      const { description, discount, price, rating, title, status } =
        product.data;

      const categoriesOptions: SelectableOption[] = product.data.categories.map(
        ({ name, _id }) => ({
          label: name,
          value: _id,
        }),
      );

      reset({
        description: description,
        discount: discount ?? "",
        price: price,
        rating: rating ?? "",
        title: title,
        categories: categoriesOptions,
        status: String(status),
        image: "",
      });
    }
  }, [type, product.isSuccess]);

  const onSubmit = handleSubmit((submitData) => {
    const { categories, discount, status, price, image, rating, ...rest } =
      submitData;

    const categoriesIds = categories.map((category) => category.value);

    const data: CreateProduct = {
      ...rest,
      categories: categoriesIds,
      discount: discount === "" ? null : discount,
      status: parseInt(status) as ProductStatuses,
      price: Number(price),
      image: image ? image : null,
      rating: rating === "" ? null : rating,
    };

    if (type === "edit") {
      updateProduct.mutate({ ...data, _id: productId! });
    } else {
      createProduct.mutate(data);
    }
  });

  const isProductLoading = product.isLoading && type === "edit";

  const submitDisabled =
    updateProduct.isPending || isProductLoading || createProduct.isPending;

  return (
    <ProductForm
      type={type}
      ref={productFormStateRef}
      form={form}
      isError={product.isError}
      isLoading={isProductLoading}
      submitDisabled={submitDisabled}
      imagePreview={product.data?.imageUrl}
      onSubmit={onSubmit}
    />
  );
};
