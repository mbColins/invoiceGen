import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

const baseUrl = 'http://192.168.1.246:2002/api/v1/invoice';

export const invoiceApi = createApi({
    reducerPath: 'invoiceApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    tagTypes: ['invoice'],
    endpoints: (build) => ({
        invoice: build.mutation<any, any>({
            query: (body) => ({
                url: '/',
                body,
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
            transformResponse: (response: any) => response?.data,
            transformErrorResponse: (response: any) => response?.status,
        }),

        getCurrentUserInvoices: build.query<any, void>({
            query: () => ({
                url: '/my_invoices',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
            transformResponse: (response: any) => response?.data,
            transformErrorResponse: (response: any) => response?.status,
        }),

    })
})