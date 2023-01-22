import api from "@/api/main";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import modalsSlice from "./reducers/modalsSlice";

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  [modalsSlice.name]: modalsSlice.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware({
        serializableCheck: false,
      }).concat(api.middleware);
    },
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
