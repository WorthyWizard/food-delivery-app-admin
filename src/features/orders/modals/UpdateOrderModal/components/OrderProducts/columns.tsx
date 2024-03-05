import CancelIcon from "@mui/icons-material/Close";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import {
  GridActionsCellItem,
  GridColDef,
  GridEditInputCell,
  GridPreProcessEditCellProps,
  GridRenderEditCellParams,
  GridRowId,
  GridRowModes,
  GridRowModesModel,
} from "@mui/x-data-grid";
import { number } from "zod";

import { OrderProduct } from "@/features/orders";

import { StyledTooltip } from "./styled";

interface Props {
  rowModesModel: GridRowModesModel;
  handleSaveClick: (id: GridRowId) => () => void;
  handleCancelClick: (id: GridRowId) => () => void;
  handleEditClick: (id: GridRowId) => () => void;
  handleDeleteClick: (id: GridRowId) => () => void;
}

const QuantityEditInputCell = (props: GridRenderEditCellParams) => {
  const { error, ...rest } = props;

  return (
    <StyledTooltip open={!!error} title={error}>
      <span>
        <GridEditInputCell error={!!error} {...rest} />
      </span>
    </StyledTooltip>
  );
};

const renderEditQuantity = (params: GridRenderEditCellParams) => {
  return <QuantityEditInputCell {...params} />;
};

export const getColumns = (props: Props): GridColDef<OrderProduct>[] => {
  const {
    rowModesModel,
    handleCancelClick,
    handleDeleteClick,
    handleEditClick,
    handleSaveClick,
  } = props;

  return [
    {
      field: "quantity",
      headerName: "Quantity",
      editable: true,
      type: "number",
      align: "left",
      headerAlign: "left",
      renderEditCell: renderEditQuantity,
      valueFormatter: ({ value }) => `${value} x`,
      preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
        const { value } = params.props;

        const result = number().int().min(1).safeParse(value);

        const messages =
          !result.success && result.error.format()._errors.join(", ");

        return {
          ...params.props,
          error: messages,
        };
      },
    },
    {
      field: "title",
      headerName: "Title",
      width: 250,
    },
    {
      field: "price",
      headerName: "Price, $",
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              key={1}
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              key={2}
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            key={1}
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            key={2}
            icon={<DeleteOutlineRoundedIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];
};
