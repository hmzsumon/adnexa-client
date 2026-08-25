// adnexa-client-master/redux/features/tasks/tasksApi.ts
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

    // ────────── Start Video Watch Session ──────────
    // ইউজার play চাপলেই কল হয়। সার্ভার watchToken + requiredSeconds পাঠায়।
    startTaskWatch: builder.mutation<
      {
        success: boolean;
        watchToken: string;
        requiredSeconds: number;
        serverTime: number;
        reward: number;
      },
      { taskId: string }
    >({
      query: (body) => ({
        url: "/start-task-watch",
        method: "POST",
        body,
      }),
    }),

    // ────────── Complete Task (watch verified) ──────────
    completeTask: builder.mutation<
      any,
      { taskId: string; watchToken?: string; watchedSeconds?: number }
    >({
      query: (body) => ({
        url: "/complete-task",
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
  useStartTaskWatchMutation,
  useCompleteTaskMutation,
  useGetTasksReportQuery,
} = tasksApi;
