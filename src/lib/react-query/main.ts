import { toast } from "react-toastify";
import { DefaultOptions, QueryClient } from "@tanstack/react-query";

import { messages } from "./messages";

const queryConfig: DefaultOptions = {
  queries: {
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 5 * 60 * 1000,
  },
  mutations: {
    onError: (error: any) => {
      const errorMessage = error?.message ?? messages.error;

      toast.error(errorMessage);
    },
  },
};

export const queryClient = new QueryClient({ defaultOptions: queryConfig });
