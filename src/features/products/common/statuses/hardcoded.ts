import { ACTIVE, DRAFT, HIDDEN } from "./statusConstants";
import { ProductStatuses, ProductStatusesKeys } from "./types";

export const productStatusesMap: Record<ProductStatusesKeys, ProductStatuses> =
  {
    ACTIVE,
    DRAFT,
    HIDDEN,
  };

export const productStatusesList = Object.values(productStatusesMap);
