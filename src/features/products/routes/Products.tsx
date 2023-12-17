import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { GridRowIdGetter } from "@mui/x-data-grid";

import { ButtonWrapper } from "@/components";
import { Button, DataGrid } from "@/lib/mui";
import { productsEndpointsMap } from "@/router";

import { useGetProducts } from "../api";
import { DeleteProductDialog } from "../modals";
import { useProductModals } from "../store";
import { Product } from "../types/queries";

import { productColumns } from "./columns";

export const Products = () => {
  const navigate = useNavigate();

  const { deleteProduct, closeMutationModal } = useProductModals();

  const {
    data: products,
    isLoading: getProductsLoading,
    isFetching: getProductsFetching,
    isError: getProductsError,
  } = useGetProducts();

  const goToNewProductPage = () => {
    navigate(productsEndpointsMap.NEW);
  };

  const getRowId: GridRowIdGetter<Product> = useCallback((row) => row._id, []);

  return (
    <>
      <ButtonWrapper pb={3} justifyContent="flex-end">
        <Button
          variant="outlined"
          startIcon={<AddCircleOutlineOutlinedIcon />}
          onClick={goToNewProductPage}
        >
          New product
        </Button>
      </ButtonWrapper>
      <DataGrid
        isError={getProductsError}
        loading={getProductsLoading || getProductsFetching}
        columns={productColumns}
        rows={products ?? []}
        getRowId={getRowId}
      />
      <DeleteProductDialog
        open={deleteProduct.isOpen}
        productId={deleteProduct.id}
        onClose={() => closeMutationModal("deleteProduct")}
      />
    </>
  );
};
