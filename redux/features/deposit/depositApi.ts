import { apiSlice } from "../api/apiSlice";

export const depositApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // create deposit request
    createDepositRequest: builder.mutation<any, any>({
      query: (body) => ({
        url: "/new/deposit",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Deposits"],
    }),

    // get my deposits or logged in user deposits
    getMyDeposits: builder.query<any, any>({
      query: () => "/my-deposits",
      providesTags: ["Deposits"],
    }),

    // get single deposit
    getDeposit: builder.query<any, any>({
      query: (id) => `/deposit/${id}`,
      providesTags: ["Deposits"],
    }),

    // get active deposit method
    getActiveDepositMethod: builder.query<any, any>({
      query: () => "/deposit-method/active",
    }),

    // get active mobile banking deposit payment methods
    getActiveDepositPaymentMethods: builder.query<any, string | void>({
      query: (methodName) => ({
        url: "/deposit-payment-method/active",
        params: methodName ? { methodName } : undefined,
      }),
      providesTags: ["Deposits"],
    }),

    // create mobile banking deposit
    createMobileBankingDeposit: builder.mutation<any, any>({
      query: (body) => ({
        url: "/mobile-banking/deposit",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Deposits", "User", "Wallet", "Transactions"],
    }),

    // retry mobile banking deposit auto approve
    retryMobileBankingDeposit: builder.mutation<
      any,
      { id: string; transactionId?: string }
    >({
      query: ({ id, transactionId }) => ({
        url: `/mobile-banking/deposit/${id}/retry`,
        method: "POST",
        body: transactionId ? { transactionId } : {},
      }),
      invalidatesTags: ["Deposits", "User", "Wallet", "Transactions"],
    }),

    // deposit with binance
    depositWithBinance: builder.mutation<any, any>({
      query: (body) => ({
        url: "/binance-payment",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useCreateDepositRequestMutation,
  useGetMyDepositsQuery,
  useGetDepositQuery,
  useGetActiveDepositMethodQuery,
  useGetActiveDepositPaymentMethodsQuery,
  useCreateMobileBankingDepositMutation,
  useRetryMobileBankingDepositMutation,
  useDepositWithBinanceMutation,
} = depositApi;
