import { useCallback } from "react";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { GridRowIdGetter } from "@mui/x-data-grid";

import { ButtonWrapper } from "@/components";
import { Button, DataGrid } from "@/lib/mui";

import { useGetProductCategories } from "../api";
import {
  CreateProductCategoryModal,
  DeleteProductCategoryDialog,
  UpdateProductCategoryModal,
} from "../modals";
import { useProductCategoryModals } from "../store";
import { ProductCategory } from "../types/queries";

import { categoriesColumns } from "./columns";

export const ProductCategories = () => {
  const {
    createProductCategory,
    updateProductCategory,
    deleteProductCategory,
    closeModal,
    closeMutationModal,
    openModal,
  } = useProductCategoryModals();

  const {
    data: categories,
    isLoading: getProductCategoriesLoading,
    isFetching: getProductCategoriesFetching,
    isError: getProductCategoriesError,
  } = useGetProductCategories();

  const getRowId: GridRowIdGetter<ProductCategory> = useCallback(
    (row) => row._id,
    []
  );

  return (
    <>
      <ButtonWrapper pb={3} justifyContent="flex-end">
        <Button
          variant="outlined"
          startIcon={<AddCircleOutlineOutlinedIcon />}
          onClick={() => openModal("createProductCategory")}
        >
          New product category
        </Button>
      </ButtonWrapper>
      <DataGrid
        isError={getProductCategoriesError}
        loading={getProductCategoriesLoading || getProductCategoriesFetching}
        rows={categories ?? []}
        columns={categoriesColumns}
        getRowId={getRowId}
      />
      <CreateProductCategoryModal
        open={createProductCategory.isOpen}
        onClose={() => closeModal("createProductCategory")}
      />
      <UpdateProductCategoryModal
        open={updateProductCategory.isOpen}
        categoryId={updateProductCategory.id}
        onClose={() => closeMutationModal("updateProductCategory")}
      />
      <DeleteProductCategoryDialog
        open={deleteProductCategory.isOpen}
        categoryId={deleteProductCategory.id}
        onClose={() => closeMutationModal("deleteProductCategory")}
      />
    </>
  );
};
