import { memo } from "react";
import { useNavigate } from "react-router-dom";

import { MenuButton, MenuButtonClickHandler } from "@/lib/mui";
import { productsEndpointsMap } from "@/router";

import { menuButtonOptions } from "../../hardcoded";
import { useProductModals } from "../../store";

interface Props {
  productId: string;
}

export const ProductActions = memo<Props>((props) => {
  const { productId } = props;

  const navigate = useNavigate();

  const openMutationModal = useProductModals(
    (state) => state.openMutationModal,
  );

  const deleteProduct = () => {
    openMutationModal({ id: productId, name: "deleteProduct" });
  };

  const editProduct = () => {
    navigate(`${productId}/${productsEndpointsMap.EDIT}`);
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
