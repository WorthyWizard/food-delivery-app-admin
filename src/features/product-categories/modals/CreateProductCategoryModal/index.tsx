import { useEffect } from "react";

import { ButtonWrapper, Form } from "@/components";
import { FormTextField, useForm } from "@/features/form";
import { useCreateProductCategory } from "@/features/product-categories";
import { Conditional } from "@/layouts";
import { Button, Modal, ModalProps } from "@/lib/mui";

import {
  CreateProductCategoryFormData,
  CreateProductCategorySchema,
} from "../../validation";

interface Props extends ModalProps {}

export const CreateProductCategoryModal = (props: Props) => {
  const { onClose, ...rest } = props;

  const { handleSubmit, control, reset } =
    useForm<CreateProductCategoryFormData>({
      validationSchema: CreateProductCategorySchema,
      defaultValues: {
        name: "",
        slug: "",
      },
    });

  const createProductCategory = useCreateProductCategory();

  useEffect(() => {
    if (createProductCategory.isSuccess) {
      onClose && onClose({}, "backdropClick");
      reset();
    }
  }, [createProductCategory.isSuccess]);

  const onSubmit = handleSubmit((submitData) => {
    const { name, slug } = submitData;

    createProductCategory.mutate({
      name,
      slug,
    });
  });

  const closeModalHandler = () => {
    onClose && onClose({}, "backdropClick");
  };

  const disabled = createProductCategory.isPending;

  return (
    <Modal title="New Product Category" onClose={closeModalHandler} {...rest}>
      <Conditional>
        <Form onSubmit={onSubmit}>
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
              Create
            </Button>
          </ButtonWrapper>
        </Form>
      </Conditional>
    </Modal>
  );
};
