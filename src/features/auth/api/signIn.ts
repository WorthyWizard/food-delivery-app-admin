import { useMutation } from "@tanstack/react-query";

import { axios } from "@/lib/axios";
import { MutationConfig } from "@/lib/react-query";

import { SignIn, Token } from "../types";

const signIn = async (body: SignIn): Promise<Token> => {
  return axios.post("/auth/login-manager", body);
};

export const useSignIn = (options?: MutationConfig<typeof signIn>) => {
  return useMutation({
    ...options,
    mutationFn: signIn,
  });
};
