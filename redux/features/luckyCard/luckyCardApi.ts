import { apiSlice } from "../api/apiSlice";

// ===== Lucky Card (user) API =====
// ঘষলেই সরাসরি অ্যামাউন্ট — কোনো ম্যাচিং গেম নয়।
export const luckyCardApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // শপ ক্যাটালগ (কার্ড টাইপ + প্যাকেজ + RTP)
    getLuckyShop: builder.query<any, void>({
      query: () => ({ url: "/lucky/shop", method: "GET" }),
      providesTags: ["LuckyCard"],
    }),

    // প্যাকেজ কেনা -> ব্যালেন্স কাটা + কার্ড mint
    buyLuckyPackage: builder.mutation<any, { packageId: string }>({
      query: (body) => ({ url: "/lucky/buy", method: "POST", body }),
      invalidatesTags: ["LuckyCard", "User", "Transactions"],
    }),

    // আমার কার্ড (unopened / opened)
    getMyLuckyCards: builder.query<any, string | void>({
      query: (status) => ({
        url: status ? `/lucky/cards?status=${status}` : "/lucky/cards",
        method: "GET",
      }),
      providesTags: ["LuckyCard"],
    }),

    // কার্ড খোলা (স্ক্র্যাচ) -> সার্ভার ফলাফল, জিতলে ব্যালেন্সে যোগ
    openLuckyCard: builder.mutation<any, string>({
      query: (id) => ({ url: `/lucky/cards/${id}/open`, method: "POST" }),
      invalidatesTags: ["LuckyCard", "User", "Transactions"],
    }),

    getMyLuckyPurchases: builder.query<any, void>({
      query: () => ({ url: "/lucky/purchases", method: "GET" }),
      providesTags: ["LuckyCard"],
    }),

    // provably-fair verifier (পাবলিক)
    verifyLuckyCard: builder.query<any, string>({
      query: (shortCode) => ({
        url: `/lucky/verify/${shortCode}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetLuckyShopQuery,
  useBuyLuckyPackageMutation,
  useGetMyLuckyCardsQuery,
  useOpenLuckyCardMutation,
  useGetMyLuckyPurchasesQuery,
  useVerifyLuckyCardQuery,
} = luckyCardApi;
