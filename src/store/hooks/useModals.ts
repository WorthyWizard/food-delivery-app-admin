import { bindActionCreators } from "@reduxjs/toolkit";

import { useAppDispatch } from "@/hooks/redux";
import { modalsSlice } from "../reducers";

export const useModals = () => {
  const dispatch = useAppDispatch();

  return bindActionCreators(modalsSlice.actions, dispatch);
};
