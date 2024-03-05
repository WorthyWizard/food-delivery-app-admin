import { DataGrid } from "@/lib/mui";

import { useGetOrders } from "../api";
import { UpdateOrderModal } from "../modals";
import { useOrderModals } from "../store";

import { columns } from "./columns";

export const Orders = () => {
  const { updateModal, closeMutationModal } = useOrderModals();

  const orders = useGetOrders();

  const closeUpdateModal = () => {
    closeMutationModal("updateModal");
  };

  return (
    <>
      <DataGrid
        sx={{ border: "none" }}
        isError={orders.isError}
        loading={orders.isLoading || orders.isFetching}
        columns={columns}
        rows={orders.data ?? []}
      />
      <UpdateOrderModal
        open={updateModal.isOpen}
        orderId={updateModal.id}
        onClose={closeUpdateModal}
      />
    </>
  );
};
