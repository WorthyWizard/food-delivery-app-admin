import { useEffect, useState } from "react";
import CommentRoundedIcon from "@mui/icons-material/CommentRounded";
import { Stack, Typography } from "@mui/material";
import { GridRowModesModel } from "@mui/x-data-grid";
import dayjs from "dayjs";

import { ButtonWrapper, Form } from "@/components";
import { FormSelect, SelectableOption, useForm } from "@/features/form";
import { Conditional } from "@/layouts";
import { Button, Modal, ModalProps } from "@/lib/mui";

import { useGetOrder } from "../../api/getOrder";
import { useUpdateOrder } from "../../api/updateOrder";
import {
  OrderStatuses,
  orderStatusesList,
  orderStatusesNameMap,
} from "../../common";
import { OrderProduct, UpdateOrderProduct } from "../../types";
import { EditOrderFormData, EditOrderSchema } from "../../validation";

import { OrderProducts } from "./components";

interface Props extends ModalProps {
  orderId: number | null;
}

export const UpdateOrderModal = (props: Props) => {
  const { orderId, onClose, ...rest } = props;

  const [rows, setRows] = useState<OrderProduct[]>([]);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

  const form = useForm<EditOrderFormData>({
    validationSchema: EditOrderSchema,
    defaultValues: {
      status: "",
    },
  });

  const { handleSubmit, control, reset } = form;

  const order = useGetOrder(
    {
      id: orderId!,
    },
    {
      enabled: Boolean(orderId),
    },
  );

  const updateOrder = useUpdateOrder();

  useEffect(() => {
    if (order.isSuccess) {
      setRows(order.data?.products);
    }
  }, [order.isSuccess]);

  useEffect(() => {
    if (order.isSuccess) {
      const { status } = order.data;

      reset({
        status: String(status),
      });
    }
  }, [order.isSuccess]);

  const onSubmit = handleSubmit((submitData) => {
    const { status } = submitData;

    const updatedOrderProducts: UpdateOrderProduct[] =
      rows.map<UpdateOrderProduct>((row) => ({
        id: row.id,
        quantity: row.quantity,
      }));

    updateOrder.mutate({
      id: orderId!,
      body: {
        status: parseInt(status) as OrderStatuses,
        products: updatedOrderProducts,
      },
    });
  });

  const closeModalHandler = () => {
    onClose && onClose({}, "backdropClick");

    setRows([]);
  };

  const { date, total, comment } = order.data || {};

  const statusOptions: SelectableOption[] = orderStatusesList.map((status) => ({
    label: orderStatusesNameMap[status],
    value: String(status),
  }));

  const disabled =
    updateOrder.isPending ||
    order.isPending ||
    Object.keys(rowModesModel).length > 0;

  return (
    <Modal
      title="Edit Order"
      onClose={closeModalHandler}
      sx={{ maxWidth: 800 }}
      {...rest}
    >
      <Conditional isError={order.isError}>
        <Form onSubmit={onSubmit}>
          <Stack
            width="100%"
            direction="row"
            alignItems="center"
            gap={2}
            mb={2}
          >
            <Typography>№{orderId}</Typography>
            <Typography>{dayjs(date).format("L LT")}</Typography>
            <FormSelect
              wrapperProps={{ sx: { width: 250 } }}
              size="small"
              options={statusOptions}
              config={{
                control,
                name: "status",
              }}
            />
          </Stack>
          <OrderProducts
            isLoading={order.isLoading || order.isPending}
            rows={rows}
            setRows={setRows}
            rowModesModel={rowModesModel}
            setRowModesModel={setRowModesModel}
          />
          {Boolean(comment) && (
            <Stack
              width="100%"
              direction="row"
              gap={1}
              p={2}
              border={({ palette }) => `1px solid ${palette.divider}`}
              borderRadius={1}
            >
              <CommentRoundedIcon />
              <Typography>{comment}</Typography>
            </Stack>
          )}
          <Typography width="100%" fontWeight={500} variant="h6" mt={2}>
            Total: {total}$
          </Typography>
          <ButtonWrapper>
            <Button type="submit" disabled={disabled}>
              Update
            </Button>
          </ButtonWrapper>
        </Form>
      </Conditional>
    </Modal>
  );
};
