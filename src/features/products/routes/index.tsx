import { useCallback } from "react";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { GridRowIdGetter } from "@mui/x-data-grid";

import { ButtonWrapper } from "@/components";
import { Button, DataGrid } from "@/lib/mui";

import { useGetProducts } from "../api";
import {
  CreateProductModal,
  DeleteProductDialog,
  UpdateProductModal,
} from "../modals";
import { useProductModals } from "../store";
import { Product } from "../types/queries";

import { productColumns } from "./columns";

export const Products = () => {
  const {
    createProduct,
    updateProduct,
    deleteProduct,
    closeModal,
    closeMutationModal,
    openModal,
  } = useProductModals();

  const {
    data: products,
    isLoading: getProductsLoading,
    isFetching: getProductsFetching,
    isError: getProductsError,
  } = useGetProducts();

  const getRowId: GridRowIdGetter<Product> = useCallback((row) => row._id, []);

  return (
    <>
      <ButtonWrapper pb={3} justifyContent="flex-end">
        <Button
          variant="outlined"
          startIcon={<AddCircleOutlineOutlinedIcon />}
          onClick={() => openModal("createProduct")}
        >
          New product
        </Button>
      </ButtonWrapper>
      <DataGrid
        isError={getProductsError}
        loading={getProductsLoading || getProductsFetching}
        rows={products ?? []}
        columns={productColumns}
        getRowId={getRowId}
      />
      <CreateProductModal
        open={createProduct.isOpen}
        onClose={() => closeModal("createProduct")}
      />
      <UpdateProductModal
        open={updateProduct.isOpen}
        productId={updateProduct.id}
        onClose={() => closeMutationModal("updateProduct")}
      />
      <DeleteProductDialog
        open={deleteProduct.isOpen}
        productId={deleteProduct.id}
        onClose={() => closeMutationModal("deleteProduct")}
      />
    </>
  );
};
