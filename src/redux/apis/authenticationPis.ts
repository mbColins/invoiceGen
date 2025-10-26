import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'http://192.168.1.246:2002/api/v1/auth';

export const authenticationApi = createApi({
  reducerPath: 'authenticationApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ['Auth'],
  endpoints: (build) => ({
    authUser: build.mutation<any, any>({
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
  }),
});

export const { useAuthUserMutation } = authenticationApi;
