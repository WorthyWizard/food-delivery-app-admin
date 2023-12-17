import { forwardRef, useCallback, useImperativeHandle, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { UseFormReturn } from "react-hook-form";
import { Stack, Typography } from "@mui/material";

import { ButtonWrapper, Form, ImageUpload } from "@/components";
import {
  FormMultiAutocomplete,
  FormSelect,
  FormTextField,
  SelectableOption,
} from "@/features/form";
import { useGetProductCategories } from "@/features/product-categories";
import { Conditional } from "@/layouts";
import { Button } from "@/lib/mui";

import { ProductFormData } from "../../validation";

import { statusOptions } from "./hardcoded";
import { ProductFormRefValue, ProductFormType } from "./types";

interface Props {
  type: ProductFormType;
  form: UseFormReturn<ProductFormData>;
  onSubmit: () => void;
  submitDisabled: boolean;
  isError?: boolean;
  isLoading?: boolean;
  imagePreview?: string;
}

export const ProductForm = forwardRef<ProductFormRefValue, Props>(
  (props, ref) => {
    const {
      form,
      onSubmit,
      submitDisabled,
      type,
      isError,
      isLoading,
      imagePreview,
    } = props;

    const { control, setValue, formState } = form;

    const [imageFile, setImageFile] = useState<File | null>(null);
    const [fileRejections, setFileRejections] = useState<FileRejection[]>([]);

    const categories = useGetProductCategories();

    useImperativeHandle<ProductFormRefValue, ProductFormRefValue>(
      ref,
      () => ({
        getImageFile: () => {
          return imageFile;
        },
        resetImageFile: () => {
          setImageFile(null);
        },
      }),
      [imageFile],
    );

    const onDrop = useCallback((acceptedFiles: File[]) => {
      if (acceptedFiles.length === 1) {
        setValue("image", acceptedFiles[0], { shouldValidate: true });
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

    const categoriesOptions: SelectableOption[] = (categories.data ?? []).map(
      ({ name, _id }) => ({
        label: name,
        value: _id,
      }),
    );

    const imageErrorMessage = formState.errors["image"]?.message;

    return (
      <Conditional
        isLoading={categories.isLoading || isLoading}
        isError={categories.isError || isError}
      >
        <Form onSubmit={onSubmit}>
          <Stack width="100%" height="100%" direction="row" gap={3}>
            <Stack width="100%" gap={1} overflow="auto">
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
              <ButtonWrapper>
                <Button type="submit" disabled={submitDisabled}>
                  {type === "create" ? "Create" : "Update"}
                </Button>
              </ButtonWrapper>
            </Stack>
            <Stack minWidth={300} gap={2}>
              <Stack gap={0.5}>
                <ImageUpload
                  isError={Boolean(imageErrorMessage)}
                  imageFile={imageFile}
                  imagePreview={imagePreview}
                  wrapperProps={{ sx: { maxWidth: "100%" } }}
                  fileRejections={fileRejections}
                  dropzoneState={dropzoneState}
                />
                {imageErrorMessage && (
                  <Typography color="error" variant="caption">
                    {imageErrorMessage}
                  </Typography>
                )}
              </Stack>
              <Stack pr={1} overflow="auto" gap={0.5}>
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
        </Form>
      </Conditional>
    );
  },
);

ProductForm.displayName = "ProductForm";
