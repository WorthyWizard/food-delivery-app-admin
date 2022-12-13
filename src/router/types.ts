type AllEndpointsModule = typeof import("./endpointConstants");

export type AllEndpoints = AllEndpointsModule[keyof AllEndpointsModule];
