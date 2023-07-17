import { useEffect } from "react";

import { ButtonWrapper, Form } from "@/components";
import { useCreateProductCategory } from "@/features/product-categories";
import { ModalHeading } from "@/globalStyled";
import { Conditional } from "@/layouts";
import { Button, Modal, ModalProps } from "@/lib/mui";
import { FormTextField, useForm } from "@/lib/react-hook-form";

import {
  CreateProductCategoryFormData,
  CreateProductCategorySchema,
} from "../../forms";

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

  const {
    mutate: createProductCategory,
    isLoading: createProductCategoryLoading,
    isSuccess: createProductCategorySuccess,
  } = useCreateProductCategory();

  useEffect(() => {
    if (createProductCategorySuccess) {
      onClose && onClose({}, "backdropClick");
      reset();
    }
  }, [createProductCategorySuccess]);

  const onSubmit = handleSubmit((formData) => {
    const { name, slug } = formData;

    createProductCategory({
      name,
      slug,
    });
  });

  const closeModalHandler = () => {
    onClose && onClose({}, "backdropClick");
  };

  const disabled = createProductCategoryLoading;

  return (
    <Modal onClose={closeModalHandler} {...rest}>
      <ModalHeading>Create Product Category</ModalHeading>
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
