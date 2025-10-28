import { configureStore } from '@reduxjs/toolkit';
import { authenticationApi } from './apis/authenticationPis';
import loginReducer from './slice/loginSlice'; // adjust path to your reducer
import registrationReducer from './slice/registrationSlice'; // adjust path to your reducer
import invoiceReducer from './slice/invoiceSlice'
import { invoiceApi } from './apis/invoiceApi';

export const store = configureStore({
  reducer: {
    login: loginReducer,
    register: registrationReducer,
    invoice: invoiceReducer,
    [authenticationApi.reducerPath]: authenticationApi.reducer,
    [invoiceApi.reducerPath]: invoiceApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authenticationApi.middleware,invoiceApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
