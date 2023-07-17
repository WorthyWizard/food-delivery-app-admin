import { memo } from "react";

import { MenuButton, MenuButtonClickHandler } from "@/lib/mui";

import { menuButtonOptions } from "../../hardcoded";
import { useProductCategoryModals } from "../../store";

interface Props {
  productId: string;
}

export const ProductCategoryActions = memo<Props>((props) => {
  const { productId } = props;

  const openMutationModal = useProductCategoryModals(
    (state) => state.openMutationModal
  );

  const deleteProduct = () => {
    openMutationModal({ id: productId, name: "deleteProductCategory" });
  };

  const editProduct = () => {
    openMutationModal({ id: productId, name: "updateProductCategory" });
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

ProductCategoryActions.displayName = "ProductCategoryActions";
