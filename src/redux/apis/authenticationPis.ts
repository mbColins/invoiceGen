import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseUrl = 'http://192.168.1.127:2002/api/v1/auth';

type LoginResponse = {
  accessToken: string;
  refreshToken: string;
  tokenType: string; // "Bearer"
  username: string;
  role: string;
  message: string;
};



export const authenticationApi = createApi({
  reducerPath: 'authenticationApi',
  baseQuery: fetchBaseQuery({
    baseUrl, prepareHeaders: async (headers) => {
      const token = await AsyncStorage.getItem('accessToken');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),

  tagTypes: ['Auth'],
  endpoints: (build) => ({
    authUser: build.mutation<LoginResponse,any>({
      query: (body) => ({
        url: '/login', // ✅ No leading slash
        method: 'POST',
        body,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      transformResponse: (response: any) => response?.data,
      transformErrorResponse: (response: any) => response?.status,
    }),


    registerUser: build.mutation<any, any>({
      query: (body) => ({
        url: '/register', // your backend registration endpoint
        method: 'POST',
        body,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      transformResponse: (response: any) => response?.data,
      transformErrorResponse: (response: any) => response?.status,
    }),
  })
})

export const { useAuthUserMutation, useRegisterUserMutation } = authenticationApi;
