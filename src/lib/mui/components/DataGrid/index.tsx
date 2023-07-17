import {
  DataGrid as MuiDataGrid,
  DataGridProps,
  GridToolbar,
} from "@mui/x-data-grid";

import { Conditional } from "@/layouts";

interface Props extends DataGridProps {
  /** If `true`, returns an error boundary instead of the data grid */
  isError?: boolean;
}

export const DataGrid = (props: Props) => {
  const { slotProps, slots, isError, ...rest } = props;

  return (
    <Conditional isError={isError}>
      <MuiDataGrid
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
          },
          ...slotProps,
        }}
        {...rest}
      />
    </Conditional>
  );
};
