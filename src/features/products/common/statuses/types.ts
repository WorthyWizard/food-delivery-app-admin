type ProductStatusesModule = typeof import("./statusConstants");

export type ProductStatusesKeys = keyof ProductStatusesModule;

export type ProductStatuses = ProductStatusesModule[ProductStatusesKeys];
