import { useMemo } from "react";
import { Stack } from "@mui/material";
import {
  DataGrid,
  GridEventListener,
  GridRowEditStopReasons,
  GridRowId,
  GridRowModel,
  GridRowModes,
  GridRowModesModel,
} from "@mui/x-data-grid";

import { OrderProduct } from "@/features/orders";
import { useToggle } from "@/hooks";
import { SetStateDispatch } from "@/types";
import { createTrueBasedMap } from "@/utils";

import { AddOrderProductModal, RemoveOrderProductDialog } from "../../modals";

import { getColumns } from "./columns";
import { EditToolbar } from "./EditToolbar";

interface Props {
  isLoading: boolean;
  rowModesModel: GridRowModesModel;
  setRowModesModel: SetStateDispatch<GridRowModesModel>;
  rows: OrderProduct[];
  setRows: SetStateDispatch<OrderProduct[]>;
}

export const OrderProducts = (props: Props) => {
  const { rowModesModel, setRowModesModel, rows, setRows, isLoading } = props;

  const [removeProductDialogState, removeProductDialogActions] = useToggle<{
    id: number | null;
  }>({
    params: {
      id: null,
    },
  });

  const [addProductModalState, addProductModalActions] = useToggle();

  const orderProductIdsMap = useMemo(
    () => createTrueBasedMap(rows, "id"),
    [rows],
  );

  const addOrderProduct = () => {
    addProductModalActions.open();
  };

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event,
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const removeOrderProduct = (id: GridRowId) => () => {
    setRows(rows.filter((row) => row.id !== id));

    removeProductDialogActions.close();
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    removeProductDialogActions.open({
      id: id as number,
    });
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
  };

  const processRowUpdate = (newRow: GridRowModel<OrderProduct>) => {
    setRows(rows.map((row) => (row.id === newRow.id ? newRow : row)));

    return newRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  return (
    <Stack width="100%" height={350}>
      <DataGrid
        hideFooter
        loading={isLoading}
        rows={rows}
        editMode="row"
        columns={getColumns({
          rowModesModel,
          handleCancelClick,
          handleDeleteClick,
          handleEditClick,
          handleSaveClick,
        })}
        slots={{ toolbar: EditToolbar }}
        slotProps={{ toolbar: { addOrderProduct } }}
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
      />
      <RemoveOrderProductDialog
        open={removeProductDialogState.flag}
        productId={removeProductDialogState.params?.id ?? null}
        onDelete={removeOrderProduct}
        onCancel={removeProductDialogActions.close}
        onClose={removeProductDialogActions.close}
      />
      <AddOrderProductModal
        orderProductIdsMap={orderProductIdsMap}
        setRowModesModel={setRowModesModel}
        setRows={setRows}
        open={addProductModalState.flag}
        onClose={addProductModalActions.close}
      />
    </Stack>
  );
};
