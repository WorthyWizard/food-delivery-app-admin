import { DataGridProps, GridToolbar } from "@mui/x-data-grid";

import { Conditional } from "@/layouts";

import { StyledDataGrid } from "./styled";

interface Props extends DataGridProps {
  /** If `true`, returns an error boundary instead of the data grid */
  isError?: boolean;
}

export const DataGrid = (props: Props) => {
  const { slotProps, slots, isError, ...rest } = props;

  const { toolbar } = slotProps || {};

  return (
    <Conditional isError={isError}>
      <StyledDataGrid
        disableRowSelectionOnClick
        slots={{
          toolbar: GridToolbar,
          ...slots,
        }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            printOptions: { disableToolbarButton: true },
            csvOptions: { disableToolbarButton: true },
            ...toolbar,
          },
          ...slotProps,
        }}
        {...rest}
      />
    </Conditional>
  );
};
