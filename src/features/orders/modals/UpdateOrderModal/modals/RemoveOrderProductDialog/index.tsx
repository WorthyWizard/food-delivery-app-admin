import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogProps,
  DialogTitle,
} from "@mui/material";
import { GridRowId } from "@mui/x-data-grid";

import { Button } from "@/lib/mui";

interface Props extends DialogProps {
  productId: number | null;
  onDelete: (id: GridRowId) => () => void;
  onCancel: () => void;
}

export const RemoveOrderProductDialog = (props: Props) => {
  const { onDelete, onCancel, productId, ...rest } = props;

  return (
    <Dialog {...rest}>
      <DialogTitle id="alert-dialog-title">Remove this product?</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          This action will remove the product from this order
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="text" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="text" color="error" onClick={onDelete(productId!)}>
          Remove
        </Button>
      </DialogActions>
    </Dialog>
  );
};
