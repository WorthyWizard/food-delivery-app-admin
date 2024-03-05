import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { GridToolbarContainer } from "@mui/x-data-grid";

import { Button } from "@/lib/mui";

interface EditToolbarProps {
  addOrderProduct: () => void;
}

export const EditToolbar = (props: EditToolbarProps) => {
  const { addOrderProduct } = props;

  return (
    <GridToolbarContainer>
      <Button
        variant="text"
        color="primary"
        startIcon={<AddRoundedIcon />}
        onClick={addOrderProduct}
      >
        Add product
      </Button>
    </GridToolbarContainer>
  );
};
