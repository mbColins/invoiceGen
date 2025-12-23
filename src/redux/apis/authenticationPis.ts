import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import AsyncStorage from "@react-native-async-storage/async-storage";

const baseUrl = 'http://172.25.80.1:2002/api/v1/auth';

export const authenticationApi = createApi({
  reducerPath: 'authenticationApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    // prepareHeaders: async (headers) => {
    //   try {
    //     const token = await AsyncStorage.getItem('accessToken');
    //     if (token) {
    //       // Decode token to check expiry
    //       const { exp } = jwtDecode<{ exp: number }>(token);
    //       const now = Date.now() / 1000;

    //       if (exp < now) {
    //         console.log('Token expired, removing from storage');
    //         await AsyncStorage.removeItem('accessToken');
    //       } else {
    //         headers.set('Authorization', `Bearer ${token}`);
    //         console.log('Token attached:', token);
    //       }
    //     }
    //   } catch (err) {
    //     console.warn('Error checking token:', err);
    //   }
    //   return headers;
    // },
  }),
  tagTypes: ['Auth'],
  endpoints: (build) => ({
    authUser: build.mutation<any, any>({
      query: (body) => ({
        url: 'login',
        method: 'POST',
        body,
      }),
      transformResponse: (response: any) => response?.data,
      transformErrorResponse: (response: any) => response?.status,
    }),

    registerUser: build.mutation<any, any>({
      query: (body) => ({
        url: 'register',
        method: 'POST',
        body,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      transformResponse: (response: any) => response?.data,
      transformErrorResponse: (response: any) => response?.status,
    }),
  }),
});

export const { useAuthUserMutation, useRegisterUserMutation } = authenticationApi;
function jwtDecode<T>(token: string): { exp: any; } {
  throw new Error('Function not implemented.');
}

