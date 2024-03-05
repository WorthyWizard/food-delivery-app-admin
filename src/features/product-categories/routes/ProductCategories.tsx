import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

import { ButtonWrapper } from "@/components";
import { Button, DataGrid } from "@/lib/mui";

import { useGetProductCategories } from "../api";
import {
  CreateProductCategoryModal,
  DeleteProductCategoryDialog,
  UpdateProductCategoryModal,
} from "../modals";
import { useProductCategoryModals } from "../store/useProductCategoryModals";

import { categoriesColumns } from "./columns";

export const ProductCategories = () => {
  const {
    createModal,
    updateModal,
    deleteModal,
    closeModal,
    closeMutationModal,
    openModal,
  } = useProductCategoryModals();

  const categories = useGetProductCategories();

  return (
    <>
      <ButtonWrapper pb={3} justifyContent="flex-end">
        <Button
          variant="outlined"
          startIcon={<AddCircleOutlineOutlinedIcon />}
          onClick={() => openModal("createModal")}
        >
          New product category
        </Button>
      </ButtonWrapper>
      <DataGrid
        sx={{ border: "none" }}
        isError={categories.isError}
        loading={categories.isLoading || categories.isFetching}
        rows={categories.data ?? []}
        columns={categoriesColumns}
      />
      <CreateProductCategoryModal
        open={createModal.isOpen}
        onClose={() => closeModal("createModal")}
      />
      <UpdateProductCategoryModal
        open={updateModal.isOpen}
        categoryId={updateModal.id}
        onClose={() => closeMutationModal("updateModal")}
      />
      <DeleteProductCategoryDialog
        open={deleteModal.isOpen}
        categoryId={deleteModal.id}
        onClose={() => closeMutationModal("deleteModal")}
      />
    </>
  );
};
