import AsyncStorage from "@react-native-async-storage/async-storage";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const baseUrl = "http://172.26.102.34:2002/api/v1/business";


export const businessApi = createApi({
    reducerPath: "businessApi",
    tagTypes: ["business"],
    baseQuery: fetchBaseQuery({
        baseUrl, prepareHeaders: async (headers) => {
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

    endpoints: (build) => ({
        createBusiness: build.mutation<any, FormData>({
            query: (formData) => ({
                url: "",
                method: "POST",
                body: formData,
            }),
            transformResponse: (response: any) => response?.data,
            transformErrorResponse: (response: any) => response?.status
        }),

         getBusinessDetail: build.query<any, void>({
            query: () => ({
                url: "/my_business",
                method: "GET",
            }),
            // transformResponse: (response: any) => response.data,
            transformErrorResponse: (response: any) => response?.status,
            providesTags: ["business"],
        }),


    })
})

export const { useCreateBusinessMutation, useGetBusinessDetailQuery } = businessApi;
