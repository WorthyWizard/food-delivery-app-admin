import { useState } from "react";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { GridRowModes, GridRowModesModel } from "@mui/x-data-grid";

import { ButtonWrapper } from "@/components";
import { SelectableOption } from "@/features/form";
import { OrderProduct } from "@/features/orders";
import { useGetProducts } from "@/features/products";
import { Conditional } from "@/layouts";
import { Autocomplete, Button, Modal, ModalProps } from "@/lib/mui";
import { SetStateDispatch } from "@/types";
import { TrueBasedMap } from "@/utils";

interface Props extends ModalProps {
  setRows: SetStateDispatch<OrderProduct[]>;
  setRowModesModel: SetStateDispatch<GridRowModesModel>;
  orderProductIdsMap: TrueBasedMap;
}

export const AddOrderProductModal = (props: Props) => {
  const { onClose, setRows, orderProductIdsMap, setRowModesModel, ...rest } =
    props;

  const [value, setValue] = useState<SelectableOption | null>(null);
  const [inputValue, setInputValue] = useState("");

  const products = useGetProducts();

  const selectedProduct = value
    ? products.data?.find((product) => product.id === parseInt(value.value))
    : null;

  const closeModalHandler = () => {
    onClose && onClose({}, "backdropClick");
  };

  const reset = () => {
    setValue(null);
    setInputValue("");
  };

  const addProductToGrid = () => {
    if (!selectedProduct) return;

    const { id, totalPrice, description, title } = selectedProduct;

    setRows((prevState) => [
      ...prevState,
      { id, description, price: totalPrice, quantity: 1, title },
    ]);

    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "quantity" },
    }));

    closeModalHandler();
    reset();
  };

  const productOptions: SelectableOption[] = (products.data ?? [])
    .filter((product) => !orderProductIdsMap[product.id])
    .map((product) => ({
      label: `${product.title}, ${product.totalPrice}$`,
      value: String(product.id),
    }));

  return (
    <Modal title="Add Product" onClose={closeModalHandler} {...rest}>
      <Conditional isLoading={products.isLoading}>
        <Autocomplete
          inputProps={{ label: "Product" }}
          options={productOptions}
          value={value}
          onChange={(_, newValue: SelectableOption | null) => {
            setValue(newValue);
          }}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
        />
        <ButtonWrapper mt={1}>
          <Button
            disabled={!value}
            onClick={addProductToGrid}
            startIcon={<AddRoundedIcon />}
          >
            Add
          </Button>
        </ButtonWrapper>
      </Conditional>
    </Modal>
  );
};
