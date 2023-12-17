type AllEndpointsModule = typeof import("./constants/endpoints");
type RouterParamsModule = typeof import("./constants/params");

export type AllEndpoints = AllEndpointsModule[keyof AllEndpointsModule];
export type RouterParams = RouterParamsModule[keyof RouterParamsModule];
