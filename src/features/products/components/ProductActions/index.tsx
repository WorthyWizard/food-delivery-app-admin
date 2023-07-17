import { memo } from "react";

import { MenuButton, MenuButtonClickHandler } from "@/lib/mui";

import { menuButtonOptions } from "../../hardcoded";
import { useProductModals } from "../../store";

interface Props {
  productId: string;
}

export const ProductActions = memo<Props>((props) => {
  const { productId } = props;

  const openMutationModal = useProductModals(
    (state) => state.openMutationModal
  );

  const deleteProduct = () => {
    openMutationModal({ id: productId, name: "deleteProduct" });
  };

  const editProduct = () => {
    openMutationModal({ id: productId, name: "updateProduct" });
  };

  const onMenuItemClick: MenuButtonClickHandler = (_, currentItem) => {
    switch (menuButtonOptions[currentItem].label) {
      case "Edit":
        editProduct();
        break;
      case "Delete":
        deleteProduct();
        break;
    }
  };

  return <MenuButton menuItems={menuButtonOptions} onClick={onMenuItemClick} />;
});

ProductActions.displayName = "ProductActions";
