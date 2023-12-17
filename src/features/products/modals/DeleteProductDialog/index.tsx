import { useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogProps,
  DialogTitle,
} from "@mui/material";

import { Button } from "@/lib/mui";

import { useDeleteProduct } from "../../api";

interface Props extends DialogProps {
  productId: string | null;
}

export const DeleteProductDialog = (props: Props) => {
  const { productId, onClose, ...rest } = props;

  const deleteProduct = useDeleteProduct();

  useEffect(() => {
    if (deleteProduct.isSuccess) {
      closeModal();
    }
  }, [deleteProduct.isSuccess]);

  const closeModal = () => {
    onClose && onClose({}, "backdropClick");
  };

  const deleteProductHandler = () => {
    deleteProduct.mutate(productId!);
  };

  const disabled = deleteProduct.isPending;

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
        <Button disabled={disabled} variant="text" onClick={closeModal}>
          Cancel
        </Button>
        <Button
          disabled={disabled}
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
