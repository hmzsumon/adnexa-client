import { apiSlice } from '../api/apiSlice';

export const sendApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		send: builder.mutation({
			query: (body) => ({
				url: '/send-usdt',
				method: 'POST',
				body,
			}),
			invalidatesTags: ['User'],
		}),

		// find user by customer id
		findUserByCustomerId: builder.mutation<any, any>({
			query: (userId) => ({
				url: `/get-user-by-partner-id-for-send/${userId}`,
				method: 'PUT',
			}),
		}),
	}),
});

export const { useSendMutation, useFindUserByCustomerIdMutation } = sendApi;
