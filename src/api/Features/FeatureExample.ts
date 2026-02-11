import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../baseQueryWithAxios";

export const exampleApi = createApi({
  reducerPath: "exampleApi",
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getExampleData: builder.query({
      query: () => ({ url: "/example", method: "GET" }),
      transformResponse: (response: any) => {
        // Example transformation logic
        return;
      },
    }),
  }),
});

export const { useGetExampleDataQuery } = exampleApi;
