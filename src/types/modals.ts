export type ModalTypes = "createProduct" | "createUser";

export type ModalWithIdsTypes =
  | "editUser"
  | "editProduct"
  | "deleteUser"
  | "deleteProduct";

export type AllModals = ModalTypes | ModalWithIdsTypes;
