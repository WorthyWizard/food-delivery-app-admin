import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

import { DataGrid } from "@/components";
import { Button, ButtonWrapper } from "@/components/UI";
import { useAppSelector } from "@/hooks/redux";
import { modalsStateSelector } from "@/store/selectors";
import { productColumns } from "./columns";
import { productsAPI } from "@/api";
import { useModals } from "@/store/hooks";
import {
  CreateProductModal,
  EditProductModal,
  DeleteProductDialog,
} from "./modals";
import { useCallback } from "react";
import { GridRowIdGetter } from "@mui/x-data-grid";
import { Product } from "@/types/product/queries";

export const Products = () => {
  const { openModal, closeModal, closeMutationModal } = useModals();

  const { createProduct, editProduct, deleteProduct } =
    useAppSelector(modalsStateSelector);

  const {
    data: products,
    isLoading: getProductsLoading,
    isFetching: getProductsFetching,
    isError: getProductsError,
  } = productsAPI.useGetProductsQuery();

  const getRowId: GridRowIdGetter<Product> = useCallback((row) => row._id, []);

  return (
    <>
      <ButtonWrapper pb={3} justifyContent="flex-end">
        <Button
          size="small"
          variant="outlined"
          startIcon={<AddCircleOutlineOutlinedIcon />}
          onClick={() => openModal("createProduct")}
        >
          New product
        </Button>
      </ButtonWrapper>
      <DataGrid
        loading={getProductsLoading || getProductsFetching}
        error={getProductsError || undefined}
        rows={products ?? []}
        columns={productColumns}
        getRowId={getRowId}
      />
      <CreateProductModal
        open={createProduct.isOpen}
        onClose={() => closeModal("createProduct")}
      />
      <EditProductModal
        open={editProduct.isOpen}
        productId={editProduct.id}
        onClose={() => closeMutationModal("editProduct")}
      />
      <DeleteProductDialog
        open={deleteProduct.isOpen}
        productId={deleteProduct.id}
        onClose={() => closeMutationModal("deleteProduct")}
      />
    </>
  );
};
