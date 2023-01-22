import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

import productsAPI from "@/api/products";
import { DataGrid } from "@/components";
import { Button, ButtonWrapper } from "@/components/UI";
import { useAppSelector } from "@/hooks/redux";
import useModals from "@/store/hooks/useModals";
import { modalsStateSelector } from "@/store/selectors";
import { productColumns } from "./columns";
import DeleteProductDialog from "./modals/DeleteProductDialog";
import EditProductModal from "./modals/EditProductModal";
import CreateProductModal from "./modals/CreateProductModal";

const Product = () => {
  const { openModal, closeModal, closeMutationModal } = useModals();

  const { createProduct, editProduct, deleteProduct } =
    useAppSelector(modalsStateSelector);

  const {
    data: products,
    isLoading: getProductsLoading,
    isFetching: getProductsFetching,
    isError: getProductsError,
  } = productsAPI.useGetProductsQuery();

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
        getRowId={(row) => row._id}
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

export default Product;
