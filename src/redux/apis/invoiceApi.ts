import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const baseUrl = "http://192.168.1.246:2002/api/v1/invoice";

export const invoiceApi = createApi({
  reducerPath: "invoiceApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: async (headers) => {
      try {
        const token = await AsyncStorage.getItem("accessToken");
        if (token) {
          headers.set("Authorization", `Bearer ${token}`);
        }
      } catch (error) {
        console.warn("Error fetching token:", error);
      }
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["invoice"],
  endpoints: (build) => ({
    invoice: build.mutation<any, any>({
      query: (body) => ({
        url: "/new",
        method: "POST",
        body,
      }),
      transformResponse: (response: any) => response?.data,
      transformErrorResponse: (response: any) => response?.status,
    }),

   getCurrentUserInvoices: build.query<any, { filter?: string; search?: string; page?: number; size?: number }>({
            query: ({ filter, search, page = 0, size = 10 } = {}) => {
                const params = new URLSearchParams();
                if (filter) params.append('filter', filter);
                if (search) params.append('search', search);
                params.append('page', page.toString());
                params.append('size', size.toString());

                return {
                    url: `/my_invoices?${params.toString()}`,
                    method: 'GET',
                };
            },
            transformResponse: (response: any) => response?.data,
            transformErrorResponse: (response: any) => response?.status,
        }),

    })
});

export const { useInvoiceMutation, useGetCurrentUserInvoicesQuery } = invoiceApi;
