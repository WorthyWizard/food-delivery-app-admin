import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { GridRenderCellParams } from "@mui/x-data-grid";

import { ModalsStore } from "@/common/modals";
import { MenuButton, MenuButtonClickHandler } from "@/lib/mui";

import { menuButtonOptions } from "./hardcoded";
import { GridActionOptions } from "./types";

interface Props {
  row: GridRenderCellParams;
  useStore?: ModalsStore;
  options?: GridActionOptions;
}

export const GridActions = memo<Props>((props) => {
  const { row, useStore, options } = props;

  const id = row.id as number;

  const { handlers, navigations, types } = options || {};

  const navigate = useNavigate();

  const openMutationModal =
    useStore && useStore((state) => state.openMutationModal);

  const remove = () => {
    if (navigations && navigations?.delete) {
      handlers?.delete && handlers.delete(row);

      navigate(navigations.delete(row));
    } else if (handlers && handlers?.delete) {
      handlers.delete(row);
    } else if (openMutationModal) {
      openMutationModal({ id, name: "deleteModal" });
    }
  };

  const edit = () => {
    if (navigations && navigations?.edit) {
      handlers?.edit && handlers.edit(row);

      navigate(navigations.edit(row));
    } else if (handlers && handlers?.edit) {
      handlers.edit(row);
    } else if (openMutationModal) {
      openMutationModal({ id, name: "updateModal" });
    }
  };

  const buttonOptions = types
    ? menuButtonOptions.filter((option) => types.includes(option.type))
    : menuButtonOptions;

  const menuItemClickHandler: MenuButtonClickHandler = (_, currentItem) => {
    switch (buttonOptions[currentItem].type) {
      case "edit":
        edit();
        break;
      case "delete":
        remove();
        break;
    }
  };

  return (
    <MenuButton menuItems={buttonOptions} onClick={menuItemClickHandler} />
  );
});

GridActions.displayName = "GridActions";
