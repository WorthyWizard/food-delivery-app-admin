import { FC, useCallback, useEffect, useState } from "react";
import { Stack } from "@mui/material";
import { FileRejection, useDropzone } from "react-dropzone";

import { Form, Modal, ModalProps, ImageUpload } from "@/components";
import { ModalHeading } from "@/globalStyled";
import {
  FormMultiAutocomplete,
  FormTextField,
  SelectableOption,
  useForm,
} from "@/features/form";
import { createProductSchema } from "@/validation/products";
import { CreateProductFormData } from "@/types/product/forms";
import { Button } from "@/components/UI";
import { createFormData } from "@/utils";
import { categoriesAPI, productsAPI } from "@/api";
import { useAsyncToast } from "@/features/useAsyncToast";
import { Conditional } from "@/layouts";
import { CreateProduct } from "@/types/product/mutations";
import { isFetchBaseQueryError } from "@/api/helpers";

interface Props extends ModalProps {}

export const CreateProductModal: FC<Props> = (props) => {
  const { onClose, ...rest } = props;

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [fileRejections, setFileRejections] = useState<FileRejection[]>([]);

  const form = useForm<CreateProductFormData>({
    validationSchema: createProductSchema,
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

  const [
    createProduct,
    {
      isLoading: createProductLoading,
      isSuccess: createProductSuccess,
      isError: createProductError,
    },
  ] = productsAPI.useCreateProductMutation();

  const {
    data: categories,
    isLoading: getCatigoriesLoading,
    isError: getCatigoriesError,
    error,
  } = categoriesAPI.useGetCategoriesQuery();

  const errorMessage =
    isFetchBaseQueryError(error) && (error.data as any)?.message;

  useAsyncToast({
    success: {
      flag: createProductSuccess,
      message: "The product has been added successfully!",
    },
    error: {
      flag: createProductError,
      message: errorMessage ?? "An error occurred while adding the product!",
    },
  });

  useEffect(() => {
    if (createProductSuccess) {
      onClose && onClose({}, "backdropClick");
      setImageFile(null);
      reset();
    }
  }, [createProductSuccess]);

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

  const onSubmit = handleSubmit((formData) => {
    const { description, discount, price, rating, title, categories } =
      formData;

    const categoriesIds = categories.map((category) => category.value);

    const submitData = createFormData<CreateProduct>({
      title,
      description,
      discount: discount ? String(discount) : "",
      price: String(price),
      rating: rating ? String(rating) : "",
      image: imageFile!,
      categories: JSON.stringify(categoriesIds),
    });

    createProduct(submitData);
  });

  const closeModalHandler = () => {
    onClose && onClose({}, "backdropClick");
    setFileRejections([]);
  };

  const categoriesOptions: SelectableOption[] = (categories ?? []).map(
    (category) => ({
      label: category.name,
      value: category._id,
    })
  );

  const isValidToSubmit =
    isValid && Boolean(imageFile) && !createProductLoading;

  const isLoading = getCatigoriesLoading;

  const isError = getCatigoriesError;

  return (
    <Modal sx={{ maxWidth: 1000 }} onClose={closeModalHandler} {...rest}>
      <ModalHeading>Create Product</ModalHeading>
      <Conditional isLoading={isLoading} isError={isError}>
        <Form onSubmit={onSubmit}>
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
              gap={2}
              pr={1}
              maxHeight={450}
              overflow="hidden auto"
            >
              <ImageUpload
                imageFile={imageFile}
                wrapperProps={{ sx: { maxWidth: "100%" } }}
                fileRejections={fileRejections}
                dropzoneState={dropzoneState}
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
            Create
          </Button>
        </Form>
      </Conditional>
    </Modal>
  );
};
