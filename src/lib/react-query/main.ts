import { toast } from "react-toastify";
import {
  DefaultOptions,
  MutationCache,
  QueryClient,
} from "@tanstack/react-query";
import { AxiosError } from "axios";

import { ErrorResponseData } from "@/types";

import { messages } from "./messages";

const mutationCache = new MutationCache({
  onError: (e) => {
    const error = e as AxiosError<any, ErrorResponseData>;

    const generalTitle = error.message;

    const title = error.response?.data?.error;

    const message = error.response?.data?.message;

    const combined = `${title ?? generalTitle}: ${message ?? messages.error}`;

    toast.error(combined);
  },
  onSuccess: () => {
    toast.success(messages.updateSuccess);
  },
});

const defaultOptions: DefaultOptions = {
  queries: {
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 5 * 60 * 1000,
  },
};

export const queryClient = new QueryClient({
  defaultOptions,
  mutationCache,
});
