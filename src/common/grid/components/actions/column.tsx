import { GridColDef } from "@mui/x-data-grid";

import { GridActionOptions, GridActions } from "@/common/grid";
import { ModalsStore } from "@/common/modals";

interface Props {
  store?: ModalsStore;
  options?: GridActionOptions;
}

export const createActionsColumn = (props: Props): GridColDef => {
  const { store, options } = props;

  return {
    field: "actions",
    type: "actions",
    headerName: "Actions",
    width: 100,
    sortable: false,
    hideable: false,
    disableColumnMenu: true,
    renderCell: (row) => {
      return <GridActions row={row} useStore={store} options={options} />;
    },
  };
};
