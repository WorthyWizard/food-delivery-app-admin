import { useEffect } from "react";
import { toast } from "react-toastify";

interface AsyncToastHookCase {
  flag: boolean;
  message: string;
}

interface AsyncToastHookProps {
  success?: AsyncToastHookCase;
  error?: AsyncToastHookCase;
}

export const useAsyncToast = (props: AsyncToastHookProps) => {
  const { error, success } = props;

  useEffect(() => {
    if (success?.flag) {
      toast.success(success.message);
    }
  }, [success?.flag]);

  useEffect(() => {
    if (error?.flag) {
      toast.error(error.message);
    }
  }, [error?.flag]);
};
