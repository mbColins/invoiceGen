import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseUrl = 'http://192.168.1.127:2002/api/v1/invoice';

export const invoiceApi = createApi({
    reducerPath: 'invoiceApi',
    baseQuery: fetchBaseQuery({
        baseUrl, prepareHeaders: async (headers) => {
            // Get the access token from AsyncStorage
            const token = await AsyncStorage.getItem('accessToken');
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            headers.set('Content-Type', 'application/json'); // optional
            return headers;
        },
    }),
    tagTypes: ['invoice'],
    endpoints: (build) => ({
        invoice: build.mutation<any, any>({
            query: (body) => ({
                url: '',
                method: 'POST',
                body,
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
            transformResponse: (response: any) => response?.data,
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
        }),

    }),
});

export const { useInvoiceMutation, useGetCurrentUserInvoicesQuery } = invoiceApi;
