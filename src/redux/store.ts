import { configureStore } from '@reduxjs/toolkit';
import { authenticationApi } from './apis/authenticationPis';
import loginReducer from './slice/loginSlice'; // adjust path to your reducer
import registrationReducer from './slice/registrationSlice'; // adjust path to your reducer

export const store = configureStore({
  reducer: {
    login: loginReducer,
    register: registrationReducer,
    [authenticationApi.reducerPath]: authenticationApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authenticationApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
