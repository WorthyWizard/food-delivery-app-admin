import { FC, memo } from "react";

import { MenuButton, MenuButtonClickHandler } from "@/components";
import { menuButtonOptions } from "../../hardcoded";
import { useModals } from "@/store/hooks";

interface Props {
  productId: string;
}

export const ProductActions: FC<Props> = memo(({ productId }) => {
  const { openMutationModal } = useModals();

  const deleteProduct = () => {
    openMutationModal({ id: productId, name: "deleteProduct" });
  };

  const editProduct = () => {
    openMutationModal({ id: productId, name: "editProduct" });
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
