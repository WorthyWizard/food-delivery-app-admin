import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  DialogProps,
} from "@mui/material";
import { FC, useEffect } from "react";

import { Button } from "@/components/UI";
import { productsAPI } from "@/api";
import { useAsyncToast } from "@/features/useAsyncToast";

interface Props extends DialogProps {
  productId: string | null;
}

export const DeleteProductDialog: FC<Props> = (props) => {
  const { productId, onClose, ...rest } = props;

  const [
    deleteProduct,
    {
      isLoading: deleteProductLoading,
      isError: deleteProductError,
      isSuccess: deleteProductSuccess,
    },
  ] = productsAPI.useDeleteProductMutation();

  useAsyncToast({
    success: {
      flag: deleteProductSuccess,
      message: "The product has been deleted successfully!",
    },
    error: {
      flag: deleteProductError,
      message: "An error occurred while deleting the product!",
    },
  });

  useEffect(() => {
    if (deleteProductSuccess) {
      closeModal();
    }
  }, [deleteProductSuccess]);

  const closeModal = () => {
    onClose && onClose({}, "backdropClick");
  };

  const deleteProductHandler = () => {
    deleteProduct(productId!);
  };

  const isValidToSubmit = !deleteProductLoading;

  return (
    <Dialog onClose={onClose} {...rest}>
      <DialogTitle>Delete product?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete the product? It will be permanently
          deleted
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button disabled={!isValidToSubmit} variant="text" onClick={closeModal}>
          Cancel
        </Button>
        <Button
          disabled={!isValidToSubmit}
          color="error"
          variant="text"
          onClick={deleteProductHandler}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};
