import { apiSlice } from "../api/apiSlice";

export const companyApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // get withdraw on/off status
    getWithdrawStatus: builder.query<any, any>({
      query: () => `/withdraw-status`,
      providesTags: ["Company"],
    }),

    // get maintenance mode status (public)
    getMaintenanceStatus: builder.query<any, any>({
      query: () => `/maintenance-status`,
      providesTags: ["Company"],
    }),
  }),
});

export const { useGetWithdrawStatusQuery, useGetMaintenanceStatusQuery } =
  companyApi;
