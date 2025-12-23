import AsyncStorage from "@react-native-async-storage/async-storage";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "http://172.26.102.34:2002/api/v1/user";

export const userApi = createApi({
    reducerPath: "userApi",
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
    tagTypes: ["users"],

    endpoints: (build) => ({
        // 👇 Get current user without parameters
        getUser: build.query<any, void>({
            query: () => ({
                url: "/me",
                method: "GET",
            }),
            // transformResponse: (response: any) => response.data,
            transformErrorResponse: (response: any) => response?.status,
            providesTags: ["users"],
        }),

        updateUser: build.mutation<any, any>({
            query: (userName) => ({
                url: `/${userName}`,
                method: 'PATCH',
            }),
            transformResponse: (response: any) => response?.data,
            transformErrorResponse: (response: any) => response?.status,
        })

    }),



});

export const { useGetUserQuery, useUpdateUserMutation } = userApi;
