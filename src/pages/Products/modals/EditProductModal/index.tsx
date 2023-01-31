import { FC, useCallback, useEffect, useState } from "react";
import { Stack } from "@mui/material";
import { FileRejection, useDropzone } from "react-dropzone";

import { Form, ImageUpload, Modal, ModalProps } from "@/components";
import { ModalHeading } from "@/globalStyled";
import {
  FormMultiAutocomplete,
  FormTextField,
  SelectableOption,
  useForm,
} from "@/features/form";
import { editProductSchema } from "@/validation/products";
import { EditProductFormData } from "@/types/product/forms";
import { Button } from "@/components/UI";
import { UpdateProduct } from "@/types/product/mutations";
import { getProductImage } from "@/api/common/utils";
import { categoriesAPI, productsAPI } from "@/api";
import { useAsyncToast } from "@/features/useAsyncToast";
import { Conditional } from "@/layouts";
import { createFormData } from "@/utils";
import { isFetchBaseQueryError } from "@/api/helpers";

interface Props extends ModalProps {
  productId: string | null;
}

export const EditProductModal: FC<Props> = (props) => {
  const { productId, onClose, ...rest } = props;

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [fileRejections, setFileRejections] = useState<FileRejection[]>([]);

  const form = useForm<EditProductFormData>({
    validationSchema: editProductSchema,
    defaultValues: {
      description: "",
      discount: "",
      price: "",
      rating: "",
      title: "",
      categories: [],
    },
  });

  const { handleSubmit, control, reset } = form;
  const { isValid } = form.formState;

  const {
    data: product,
    isLoading: getProductLoading,
    isError: getProductError,
    isSuccess: getProductSuccess,
  } = productsAPI.useGetProductQuery(productId!, {
    skip: productId === null,
  });

  const {
    data: categories,
    isLoading: getCatigoriesLoading,
    isError: getCatigoriesError,
  } = categoriesAPI.useGetCategoriesQuery();

  useEffect(() => {
    if (getProductSuccess) {
      const categoriesOptions: SelectableOption[] = product.categories.map(
        ({ name, _id }) => ({
          label: name,
          value: _id,
        })
      );

      reset({
        description: product.description,
        discount: product.discount ?? "",
        price: product.price,
        rating: product.rating ?? "",
        title: product.title,
        categories: categoriesOptions,
      });
    }
  }, [getProductSuccess]);

  const [
    updateProduct,
    {
      isLoading: updateProductLoading,
      isSuccess: updateProductSuccess,
      isError: updateProductError,
      error,
    },
  ] = productsAPI.useUpdateProductMutation();

  const errorMessage =
    isFetchBaseQueryError(error) && (error.data as any)?.message;

  useAsyncToast({
    success: {
      flag: updateProductSuccess,
      message: "The product has been updated successfully!",
    },
    error: {
      flag: updateProductError,
      message: errorMessage ?? "An error occurred while updating the product!",
    },
  });

  useEffect(() => {
    if (updateProductSuccess) {
      onClose && onClose({}, "backdropClick");
      setImageFile(null);
    }
  }, [updateProductSuccess]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length === 1) {
      setImageFile(acceptedFiles[0]);
    }
  }, []);

  const onDropRejected = useCallback((fileRejections: FileRejection[]) => {
    if (fileRejections.length > 0) {
      setFileRejections(fileRejections);
    }
  }, []);

  const dropzoneState = useDropzone({
    accept: {
      "image/jpeg": [".jpeg", ".jpg"],
      "image/png": [".png"],
    },
    multiple: false,
    onDrop,
    onDropRejected,
  });

  const onSubmit = handleSubmit((submitData) => {
    const { description, discount, price, rating, title, categories } =
      submitData;

    const categoriesIds = categories!.map((category) => category.value);

    const formData = createFormData<UpdateProduct>({
      _id: productId!,
      title: title ?? "",
      description: description ?? "",
      discount: discount === null ? String(0) : String(discount),
      price: price ? String(price) : "",
      rating: rating ? String(rating) : "",
      image: imageFile ? imageFile : "null",
      categories: JSON.stringify(categoriesIds),
    });

    updateProduct(formData);
  });

  const resetFileRejections = () => {
    setFileRejections([]);
  };

  const closeModalHandler = () => {
    onClose && onClose({}, "backdropClick");
    resetFileRejections();
  };

  const categoriesOptions: SelectableOption[] = (categories ?? []).map(
    (category) => ({
      label: category.name,
      value: category._id,
    })
  );

  const isValidToSubmit =
    isValid && !updateProductLoading && !getProductLoading;

  const isLoading = getProductLoading || getCatigoriesLoading;

  const isError = getProductError || getCatigoriesError;

  return (
    <Modal sx={{ maxWidth: 1000 }} onClose={closeModalHandler} {...rest}>
      <ModalHeading>Edit Product</ModalHeading>
      <Conditional isError={isError}>
        <Form isLoading={isLoading} onSubmit={onSubmit}>
          <Stack width="100%" direction="row" gap={2}>
            <Stack flex={2} gap={2}>
              <FormTextField
                size="small"
                label="Title"
                config={{ control, name: "title" }}
              />
              <FormTextField
                multiline
                rows={15}
                label="Description"
                config={{ control, name: "description" }}
              />
            </Stack>
            <Stack
              flex={1}
              gap={3}
              pr={1}
              maxHeight={450}
              overflow="hidden auto"
            >
              <ImageUpload
                imageFile={imageFile}
                imagePreview={getProductImage(productId!)}
                wrapperProps={{ sx: { maxWidth: "100%" } }}
                dropzoneState={dropzoneState}
                fileRejections={fileRejections}
              />
              <Stack mt="auto" gap={2}>
                <FormMultiAutocomplete
                  size="small"
                  inputLabel="Categories"
                  options={categoriesOptions}
                  config={{ control, name: "categories" }}
                />
                <FormTextField
                  sx={{ flex: 3 }}
                  size="small"
                  type="number"
                  label="Price"
                  config={{ control, name: "price" }}
                />
                <FormTextField
                  sx={{ flex: 1 }}
                  size="small"
                  type="number"
                  label="Discount, %"
                  config={{ control, name: "discount" }}
                />
                <FormTextField
                  size="small"
                  type="number"
                  label="Rating"
                  config={{ control, name: "rating" }}
                />
              </Stack>
            </Stack>
          </Stack>
          <Button type="submit" disabled={!isValidToSubmit}>
            Update
          </Button>
        </Form>
      </Conditional>
    </Modal>
  );
};
