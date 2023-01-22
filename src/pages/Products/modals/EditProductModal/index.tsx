import { FC, useCallback, useEffect, useState } from "react";
import { Stack } from "@mui/material";
import { FileRejection, useDropzone } from "react-dropzone";

import { Form, ImageUpload, Modal, ModalProps } from "@/components";
import productsAPI from "@/api/products";
import { ModalHeading } from "@/globalStyled";
import Conditional from "@/layouts/Conditional";
import { FormTextField, useForm } from "@/features/form";
import { editProductSchema } from "@/validation/products";
import { EditProductFormData } from "@/types/products/formData";
import { Button } from "@/components/UI";
import { UpdateProduct } from "@/types/products/mutations";
import useAsyncToast from "@/features/useAsyncToast";
import { getProductImage } from "@/api/common/utils";

interface Props extends ModalProps {
  productId: string | null;
}

const EditProductModal: FC<Props> = (props) => {
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

  useEffect(() => {
    if (getProductSuccess) {
      reset({
        description: product.description,
        discount: product.discount ?? "",
        price: product.price,
        rating: product.rating ?? "",
        title: product.title,
      });
    }
  }, [getProductSuccess]);

  const [
    updateProduct,
    {
      isLoading: updateProductLoading,
      isSuccess: updateProductSuccess,
      isError: updateProductError,
    },
  ] = productsAPI.useUpdateProductMutation();

  useAsyncToast({
    success: {
      flag: updateProductSuccess,
      message: "The product has been updated successfully!",
    },
    error: {
      flag: updateProductError,
      message: "An error occurred while updating the product!",
    },
  });

  useEffect(() => {
    if (updateProductSuccess) {
      onClose && onClose({}, "backdropClick");
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
    maxSize: 100,
    onDrop,
    onDropRejected,
  });

  const onSubmit = handleSubmit((formData) => {
    const { description, discount, price, rating, title } = formData;

    const submitData: UpdateProduct = {
      _id: productId!,
      title: title,
      description: description,
      discount: discount === 0 ? null : parseInt(discount as string),
      price: price ? parseInt(price as string) : undefined,
      rating: rating ? parseFloat(rating as string) : undefined,
    };

    updateProduct(submitData);
  });

  const resetImageFile = () => {
    setImageFile(null);
  };

  const resetFileRejections = () => {
    setFileRejections([]);
  };

  const closeModalHandler = () => {
    onClose && onClose({}, "backdropClick");
    resetFileRejections();
  };

  const isValidToSubmit =
    isValid && !updateProductLoading && !getProductLoading;

  return (
    <Modal sx={{ maxWidth: 1000 }} onClose={closeModalHandler} {...rest}>
      <ModalHeading>Edit Product</ModalHeading>
      <Conditional isError={getProductError}>
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
                imagePreview={getProductImage(productId!)}
                wrapperProps={{ sx: { maxWidth: "100%" } }}
                dropzoneState={dropzoneState}
                fileRejections={fileRejections}
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
            Update
          </Button>
        </Form>
      </Conditional>
    </Modal>
  );
};

export default EditProductModal;
