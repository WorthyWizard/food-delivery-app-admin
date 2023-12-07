import { useCallback, useEffect, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { Stack } from "@mui/material";

import { ButtonWrapper, Form, ImageUpload } from "@/components";
import { useGetProductCategories } from "@/features/product-categories";
import { ModalHeading } from "@/globalStyled";
import { Conditional } from "@/layouts";
import { Button, Modal, ModalProps } from "@/lib/mui";
import {
  FormMultiAutocomplete,
  FormSelect,
  FormTextField,
  SelectableOption,
  useForm,
} from "@/lib/react-hook-form";
import { FormDataAlike } from "@/types/common";

import { useUpdateProduct } from "../../api";
import { useGetProduct } from "../../api/getProduct";
import { EditProductFormData, EditProductSchema } from "../../forms";
import { UpdateProduct } from "../../types/mutations";
import { statusOptions } from "../hardcoded";

interface Props extends ModalProps {
  productId: string | null;
}

export const UpdateProductModal = (props: Props) => {
  const { productId, onClose, ...rest } = props;

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [fileRejections, setFileRejections] = useState<FileRejection[]>([]);

  const form = useForm<EditProductFormData>({
    validationSchema: EditProductSchema,
    defaultValues: {
      description: "",
      discount: "",
      status: "",
      price: "",
      rating: "",
      title: "",
      categories: [],
    },
  });

  const { handleSubmit, control, reset } = form;

  const {
    data: product,
    isLoading: getProductLoading,
    isError: getProductError,
    isSuccess: getProductSuccess,
  } = useGetProduct({
    id: productId,
  });

  const {
    data: categories,
    isLoading: getCatigoriesLoading,
    isError: getCatigoriesError,
  } = useGetProductCategories();

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
        status: String(product.status),
      });
    }
  }, [getProductSuccess]);

  const {
    mutate: updateProduct,
    isLoading: updateProductLoading,
    isSuccess: updateProductSuccess,
  } = useUpdateProduct();

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
    const { description, discount, price, rating, title, categories, status } =
      submitData;

    const categoriesIds = categories!.map((category) => category.value);

    const formData: FormDataAlike<UpdateProduct> = {
      _id: productId!,
      title: title ?? "",
      description: description ?? "",
      status: String(status),
      discount: discount === null ? String(0) : String(discount),
      price: price ? String(price) : "",
      rating: rating ? String(rating) : "",
      image: imageFile ? imageFile : "null",
      categories: JSON.stringify(categoriesIds),
    };

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

  const disabled = updateProductLoading || getProductLoading;

  const isLoading = getProductLoading || getCatigoriesLoading;

  const isError = getProductError || getCatigoriesError;

  return (
    <Modal sx={{ maxWidth: 1000 }} onClose={closeModalHandler} {...rest}>
      <ModalHeading>Edit Product</ModalHeading>
      <Conditional isError={isError}>
        <Form isLoading={isLoading} onSubmit={onSubmit}>
          <Stack width="100%" direction="row" gap={2}>
            <Stack flex={2} gap={1}>
              <FormTextField
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
            <Stack flex={1} gap={2}>
              <ImageUpload
                imageFile={imageFile}
                imagePreview={product?.imageUrl}
                wrapperProps={{ sx: { maxWidth: "100%" } }}
                dropzoneState={dropzoneState}
                fileRejections={fileRejections}
              />
              <Stack
                mt="auto"
                gap={0.5}
                pr={1}
                flex={1}
                maxHeight={200}
                overflow="hidden auto"
              >
                <FormSelect
                  label="Status"
                  options={statusOptions}
                  wrapperProps={{ size: "small" }}
                  config={{ control, name: "status" }}
                />
                <FormMultiAutocomplete
                  inputLabel="Categories"
                  options={categoriesOptions}
                  config={{ control, name: "categories" }}
                />
                <FormTextField
                  sx={{ flex: 3 }}
                  type="number"
                  label="Price"
                  config={{ control, name: "price" }}
                />
                <FormTextField
                  sx={{ flex: 1 }}
                  type="number"
                  label="Discount, %"
                  config={{ control, name: "discount" }}
                />
                <FormTextField
                  type="number"
                  label="Rating"
                  config={{ control, name: "rating" }}
                />
              </Stack>
            </Stack>
          </Stack>
          <ButtonWrapper>
            <Button type="submit" disabled={disabled}>
              Update
            </Button>
          </ButtonWrapper>
        </Form>
      </Conditional>
    </Modal>
  );
};
