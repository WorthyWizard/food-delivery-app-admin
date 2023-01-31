import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { api } from "@/api";
import { modalsSlice } from "./reducers";

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  [modalsSlice.name]: modalsSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    }).concat(api.middleware);
  },
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = typeof store;
export type AppDispatch = AppStore["dispatch"];
