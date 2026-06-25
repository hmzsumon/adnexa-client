import { apiSlice } from "../api/apiSlice";

export const tasksApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMyTasks: builder.query<any, void>({
      query: () => ({
        url: "/my-daily-tasks",
        method: "GET",
      }),
      providesTags: ["Task"],
    }),
    createTask: builder.mutation({
      query: (body) => ({
        url: "/tasks",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Task"],
    }),
    completeTask: builder.mutation<any, { taskId: string }>({
      query: (body) => ({
        url: "/complete-task", // ✅ MUST start with '/'
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Task", "User"],
    }),

    // get tasks report
    getTasksReport: builder.query<any, void>({
      query: () => ({
        url: "/tasks-reports",
        method: "GET",
      }),
      providesTags: ["Task"],
    }),
  }),
});

export const {
  useGetMyTasksQuery,
  useCompleteTaskMutation,
  useGetTasksReportQuery,
} = tasksApi;
