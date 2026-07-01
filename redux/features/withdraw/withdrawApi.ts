import { apiSlice } from "../api/apiSlice";

export const withdrawApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // create new withdraw request
    createWithdrawRequest: builder.mutation<any, any>({
      query: (body) => ({
        url: `/new/withdraw`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["User", "Withdraws", "Withdrawal"],
    }),

    // get my withdrawal payment methods
    getMyWithdrawPaymentMethods: builder.query<any, any>({
      query: () => `/withdraw-payment-method/my`,
      providesTags: ["Withdrawal"],
    }),

    // create my withdrawal payment method
    createWithdrawPaymentMethod: builder.mutation<any, any>({
      query: (body) => ({
        url: `/withdraw-payment-method/my`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Withdrawal"],
    }),

    // get  my withdraw requests
    getMyWithdrawRequests: builder.query<any, any>({
      query: () => `/my-withdraws`,
      providesTags: ["Withdraws"],
    }),
  }),
});

export const {
  useCreateWithdrawRequestMutation,
  useGetMyWithdrawRequestsQuery,
  useGetMyWithdrawPaymentMethodsQuery,
  useCreateWithdrawPaymentMethodMutation,
} = withdrawApi;
