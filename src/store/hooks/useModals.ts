import { bindActionCreators } from "@reduxjs/toolkit";

import { useAppDispatch } from "@/hooks/redux";
import modalsSlice from "../reducers/modalsSlice";

const useModals = () => {
  const dispatch = useAppDispatch();

  return bindActionCreators(modalsSlice.actions, dispatch);
};

export default useModals;
