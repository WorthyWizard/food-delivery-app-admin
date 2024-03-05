import {
  CANCELED,
  COMPLETED,
  FAILED,
  ON_HOLD,
  PENDING_PAYMENT,
  PROCESSING,
} from "./constants";
import { OrderStatuses } from "./types";

export const orderStatusesMap = {
  CANCELED,
  COMPLETED,
  FAILED,
  ON_HOLD,
  PENDING_PAYMENT,
  PROCESSING,
} as const;

export const orderStatusesNameMap: Record<OrderStatuses, string> = {
  [CANCELED]: "Canceled",
  [COMPLETED]: "Completed",
  [FAILED]: "Failed",
  [ON_HOLD]: "On Hold",
  [PENDING_PAYMENT]: "Pending Payment",
  [PROCESSING]: "Processing",
};

export const orderStatusesList = Object.values(orderStatusesMap);
