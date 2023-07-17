import { useEffect } from "react";

import { ButtonWrapper, Form } from "@/components";
import { ModalHeading } from "@/globalStyled";
import { Conditional } from "@/layouts";
import { Button, Modal, ModalProps } from "@/lib/mui";
import { FormTextField, useForm } from "@/lib/react-hook-form";

import { useUpdateProductCategory } from "../../api";
import { useGetProductCategory } from "../../api/getProductCategory";
import {
  UpdateProductCategoryFormData,
  UpdateProductCategorySchema,
} from "../../forms";

interface Props extends ModalProps {
  categoryId: string | null;
}

export const UpdateProductCategoryModal = (props: Props) => {
  const { categoryId, onClose, ...rest } = props;

  const form = useForm<UpdateProductCategoryFormData>({
    validationSchema: UpdateProductCategorySchema,
    defaultValues: {
      name: "",
      slug: "",
    },
  });

  const { handleSubmit, control, reset } = form;

  const {
    data: category,
    isLoading: getProductCategoryLoading,
    isError: getProductCategoryError,
    isSuccess: getProductCategorySuccess,
  } = useGetProductCategory({
    id: categoryId,
  });

  const {
    mutate: updateProductCategory,
    isLoading: updateProductCategoryLoading,
    isSuccess: updateProductCategorySuccess,
  } = useUpdateProductCategory();

  useEffect(() => {
    if (category && getProductCategorySuccess) {
      reset({
        name: category.name,
        slug: category.slug,
      });
    }
  }, [category, getProductCategorySuccess]);

  useEffect(() => {
    if (updateProductCategorySuccess) {
      onClose && onClose({}, "backdropClick");
    }
  }, [updateProductCategorySuccess]);

  const onSubmit = handleSubmit((submitData) => {
    const { name, slug } = submitData;

    updateProductCategory({
      _id: categoryId!,
      name,
      slug,
    });
  });

  const closeModalHandler = () => {
    onClose && onClose({}, "backdropClick");
  };

  const disabled = updateProductCategoryLoading || getProductCategoryLoading;

  const isLoading = getProductCategoryLoading;

  const isError = getProductCategoryError;

  return (
    <Modal onClose={closeModalHandler} {...rest}>
      <ModalHeading>Edit Product Category</ModalHeading>
      <Conditional isError={isError}>
        <Form isLoading={isLoading} onSubmit={onSubmit}>
          <FormTextField
            label="Name"
            config={{
              control,
              name: "name",
            }}
          />
          <FormTextField
            label="Slug"
            config={{
              control,
              name: "slug",
            }}
          />
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
