import { DefaultOptions, QueryClient } from "@tanstack/react-query";

const queryConfig: DefaultOptions = {
  queries: {
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 5 * 60 * 1000,
  },
};

export const queryClient = new QueryClient({ defaultOptions: queryConfig });
