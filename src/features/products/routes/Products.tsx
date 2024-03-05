import { useNavigate } from "react-router-dom";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

import { ButtonWrapper } from "@/components";
import { Button, DataGrid } from "@/lib/mui";
import { productsEndpointsMap } from "@/router";

import { useGetProducts } from "../api";
import { DeleteProductDialog } from "../modals";
import { useProductModals } from "../store";

import { productColumns } from "./columns";

export const Products = () => {
  const navigate = useNavigate();

  const { deleteModal, closeMutationModal } = useProductModals();

  const products = useGetProducts();

  const goToNewProductPage = () => {
    navigate(productsEndpointsMap.NEW);
  };

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
        sx={{ border: "none" }}
        isError={products.isError}
        loading={products.isLoading || products.isPending}
        columns={productColumns}
        rows={products.data ?? []}
      />
      <DeleteProductDialog
        open={deleteModal.isOpen}
        productId={deleteModal.id}
        onClose={() => closeMutationModal("deleteModal")}
      />
    </>
  );
};
