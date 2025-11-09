import { configureStore } from '@reduxjs/toolkit';
import { authenticationApi } from './apis/authenticationPis';
import loginReducer from './slice/loginSlice'; // adjust path to your reducer
import registrationReducer from './slice/registrationSlice'; // adjust path to your reducer
import invoiceReducer from './slice/invoiceSlice'
import businessReducer from './slice/businessSlice'
import { invoiceApi } from './apis/invoiceApi';
import { businessApi } from './apis/businessApi';
import { userApi } from './apis/userApi';

export const store = configureStore({
  reducer: {
    login: loginReducer,
    register: registrationReducer,
    invoice: invoiceReducer,
    business: businessReducer,
    [authenticationApi.reducerPath]: authenticationApi.reducer,
    [invoiceApi.reducerPath]: invoiceApi.reducer,
    [businessApi.reducerPath]: businessApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }).concat(authenticationApi.middleware, invoiceApi.middleware,
      businessApi.middleware, userApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
