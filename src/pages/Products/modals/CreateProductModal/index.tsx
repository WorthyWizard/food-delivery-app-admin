import { FC, useCallback, useEffect, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { FileError, FileRejection, useDropzone } from "react-dropzone";
import { toast } from "react-toastify";

import { Form, Modal, ModalProps, ImageUpload } from "@/components";
import productsAPI from "@/api/products";
import { ModalHeading } from "@/globalStyled";
import Conditional from "@/layouts/Conditional";
import { FormTextField, useForm } from "@/features/form";
import { createProductSchema } from "@/validation/products";
import { CreateProductFormData } from "@/types/products/formData";
import { Button } from "@/components/UI";
import useAsyncToast from "@/features/useAsyncToast";
import { createFormData } from "@/utils";

interface Props extends ModalProps {}

const CreateProductModal: FC<Props> = (props) => {
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

  useAsyncToast({
    success: {
      flag: createProductSuccess,
      message: "The product has been added successfully!",
    },
    error: {
      flag: createProductError,
      message: "An error occurred while adding the product!",
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
    const { description, discount, price, rating, title } = formData;

    const submitData = createFormData({
      title,
      description,
      discount: discount ? String(discount) : "",
      price: String(price),
      rating: rating ? String(rating) : "",
      image: imageFile!,
    });

    createProduct(submitData);
  });

  const resetImageFile = () => {
    setImageFile(null);
  };

  const closeModalHandler = () => {
    onClose && onClose({}, "backdropClick");
    setFileRejections([]);
  };

  const isValidToSubmit =
    isValid && Boolean(imageFile) && !createProductLoading;

  return (
    <Modal sx={{ maxWidth: 1000 }} onClose={closeModalHandler} {...rest}>
      <ModalHeading>Create Product</ModalHeading>
      <Conditional isError={false}>
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
            <Stack flex={1} gap={2}>
              <ImageUpload
                imageFile={imageFile}
                resetImageFile={resetImageFile}
                wrapperProps={{ sx: { maxWidth: "100%" } }}
                fileRejections={fileRejections}
                dropzoneState={dropzoneState}
              />
              <Stack mt="auto" gap={2}>
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

export default CreateProductModal;
