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

import { useDeleteProductCategory } from "../../api";

interface Props extends DialogProps {
  categoryId: string | null;
}

export const DeleteProductCategoryDialog = (props: Props) => {
  const { categoryId, onClose, ...rest } = props;

  const deleteProductCategory = useDeleteProductCategory();

  useEffect(() => {
    if (deleteProductCategory.isSuccess) {
      closeModalHandler();
    }
  }, [deleteProductCategory.isSuccess]);

  const closeModalHandler = () => {
    onClose && onClose({}, "backdropClick");
  };

  const deleteProductHandler = () => {
    deleteProductCategory.mutate(categoryId!);
  };

  const disabled = deleteProductCategory.isPending;

  return (
    <Dialog onClose={onClose} {...rest}>
      <DialogTitle>Delete product category?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this category? It will be permanently
          deleted
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button disabled={disabled} variant="text" onClick={closeModalHandler}>
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
