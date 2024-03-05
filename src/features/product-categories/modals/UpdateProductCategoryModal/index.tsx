import { useEffect } from "react";

import { ButtonWrapper, Form } from "@/components";
import { FormTextField, useForm } from "@/features/form";
import { Conditional } from "@/layouts";
import { Button, Modal, ModalProps } from "@/lib/mui";

import { useUpdateProductCategory } from "../../api";
import { useGetProductCategory } from "../../api/getProductCategory";
import {
  UpdateProductCategoryFormData,
  UpdateProductCategorySchema,
} from "../../validation";

interface Props extends ModalProps {
  categoryId: number | null;
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

  const category = useGetProductCategory(
    {
      id: categoryId,
    },
    {
      enabled: Boolean(categoryId),
    },
  );

  const updateProductCategory = useUpdateProductCategory();

  useEffect(() => {
    if (category.isSuccess) {
      const { name, slug } = category.data;

      reset({
        name,
        slug,
      });
    }
  }, [category.isSuccess]);

  useEffect(() => {
    if (updateProductCategory.isSuccess) {
      onClose && onClose({}, "backdropClick");
    }
  }, [updateProductCategory.isSuccess]);

  const onSubmit = handleSubmit((submitData) => {
    const { name, slug } = submitData;

    updateProductCategory.mutate({
      id: categoryId!,
      body: {
        name,
        slug,
      },
    });
  });

  const closeModalHandler = () => {
    onClose && onClose({}, "backdropClick");
  };

  const disabled = updateProductCategory.isPending || category.isPending;

  return (
    <Modal title="Edit Product Category" onClose={closeModalHandler} {...rest}>
      <Conditional isError={category.isError}>
        <Form isLoading={category.isPending} onSubmit={onSubmit}>
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
