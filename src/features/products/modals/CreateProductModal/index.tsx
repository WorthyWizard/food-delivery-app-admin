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

import { useCreateProduct } from "../../api/createProduct";
import { productStatusesMap } from "../../common";
import { CreateProductFormData, CreateProductSchema } from "../../forms";
import { CreateProduct } from "../../types/mutations";
import { statusOptions } from "../hardcoded";

interface Props extends ModalProps {}

export const CreateProductModal = (props: Props) => {
  const { onClose, ...rest } = props;

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [fileRejections, setFileRejections] = useState<FileRejection[]>([]);

  const { handleSubmit, control, reset } = useForm<CreateProductFormData>({
    validationSchema: CreateProductSchema,
    defaultValues: {
      description: "",
      discount: "",
      status: String(productStatusesMap.DRAFT),
      price: "",
      rating: "",
      title: "",
      categories: [],
    },
  });

  const {
    mutate: createProduct,
    isLoading: createProductLoading,
    isSuccess: createProductSuccess,
  } = useCreateProduct();

  const {
    data: categories,
    isLoading: getCatigoriesLoading,
    isError: getCatigoriesError,
  } = useGetProductCategories();

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
    const { description, discount, price, rating, title, categories, status } =
      formData;

    const categoriesIds = categories.map((category) => category.value);

    const submitData: FormDataAlike<CreateProduct> = {
      title,
      description,
      discount: discount ? String(discount) : "",
      price: String(price),
      rating: rating ? String(rating) : "",
      image: imageFile!,
      categories: JSON.stringify(categoriesIds),
      status: String(status),
    };

    createProduct(submitData);
  });

  const closeModalHandler = () => {
    onClose && onClose({}, "backdropClick");
    setFileRejections([]);
  };

  const categoriesOptions: SelectableOption[] = (categories ?? []).map(
    ({ name, _id }) => ({
      label: name,
      value: _id,
    })
  );

  const isValidToSubmit = !createProductLoading;

  const isLoading = getCatigoriesLoading;

  const isError = getCatigoriesError;

  return (
    <Modal sx={{ maxWidth: 1000 }} onClose={closeModalHandler} {...rest}>
      <ModalHeading>Create Product</ModalHeading>
      <Conditional isLoading={isLoading} isError={isError}>
        <Form onSubmit={onSubmit}>
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
                wrapperProps={{ sx: { maxWidth: "100%" } }}
                fileRejections={fileRejections}
                dropzoneState={dropzoneState}
              />
              <Stack
                pr={1}
                mt="auto"
                flex={1}
                gap={0.5}
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
                  type="number"
                  label="Price"
                  config={{ control, name: "price" }}
                />
                <FormTextField
                  type="number"
                  label="Rating"
                  config={{ control, name: "rating" }}
                />
                <FormTextField
                  type="number"
                  label="Discount, %"
                  config={{ control, name: "discount" }}
                />
              </Stack>
            </Stack>
          </Stack>
          <ButtonWrapper>
            <Button type="submit" disabled={!isValidToSubmit}>
              Create
            </Button>
          </ButtonWrapper>
        </Form>
      </Conditional>
    </Modal>
  );
};
