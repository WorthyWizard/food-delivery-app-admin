import { useMutation } from "@tanstack/react-query";

import { axios } from "@/lib/axios";
import { MutationConfig } from "@/lib/react-query";

import { SignUp, User } from "../types";

const signUp = async (body: SignUp): Promise<User> => {
  return axios.post("/managers", body);
};

export const useSignUp = (options?: MutationConfig<typeof signUp>) => {
  return useMutation({
    ...options,
    mutationFn: signUp,
  });
};
