import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const baseUrl = "http://192.168.1.127:2002/api/v1/invoice";

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
    invoice: build.mutation<any, FormData>({
      query: (formData) => ({
        url: "/new",
        method: "POST",
        body: formData, // 👈 must be FormData
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


    generateInvoice: build.query<any, string>({
      query: (invoiceNumber) => ({
        url: `/${invoiceNumber}/purchase`,
        method: "GET",
      }),
      // transformResponse: (response: any) => response.data,
      transformErrorResponse: (response: any) => response?.status,
      providesTags: ["invoice"],
    }),

    getInvoice: build.query<any, string>({
      query: (invoiceNumber) => ({
        url: `/${invoiceNumber}`,
        method: "GET",
      }),
      // transformResponse: (response: any) => response.data,
      transformErrorResponse: (response: any) => response?.status,
      providesTags: ["invoice"], 
    }),

  })
});

export const { useInvoiceMutation, useGetCurrentUserInvoicesQuery,useLazyGenerateInvoiceQuery, useGetInvoiceQuery } = invoiceApi;
