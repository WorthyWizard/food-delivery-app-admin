import { FC } from "react";
import {
  DataGrid as MuiDataGrid,
  DataGridProps,
  GridCsvExportOptions,
  GridToolbar,
} from "@mui/x-data-grid";

interface Props extends DataGridProps {}

const DataGrid: FC<Props> = (props) => {
  const { componentsProps, components, ...rest } = props;

  return (
    <MuiDataGrid
      disableSelectionOnClick
      components={{
        Toolbar: GridToolbar,
        ...components,
      }}
      componentsProps={{
        toolbar: {
          showQuickFilter: true,
          printOptions: { disableToolbarButton: true },
          csvOptions: { disableToolbarButton: true },
        },
        ...componentsProps,
      }}
      {...rest}
    />
  );
};

export default DataGrid;