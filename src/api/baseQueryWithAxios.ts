import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import { AxiosError } from "axios";
import type { AxiosRequestConfig } from "axios";
import axiosClient from "./axiosClient";

/**
 * Creates a base query function for Redux Toolkit Query using Axios.
 *
 * This function returns a base query that can be used with RTK Query's `createApi`.
 * It handles Axios requests and converts them to the format expected by RTK Query,
 * including proper error handling and response transformation.
 *
 * The base query automatically uses the configured axiosClient, which includes
 * authentication cookies, base URL, and interceptors.
 *
 * @returns {BaseQueryFn} A base query function compatible with RTK Query.
 *
 * @example
 * export const myApi = createApi({
 *   reducerPath: 'myApi',
 *   baseQuery: axiosBaseQuery(),
 *   endpoints: (builder) => ({
 *     getData: builder.query({
 *       query: () => ({ url: '/data', method: 'GET' })
 *     })
 *   })
 * });
 *
 * @example
 * // With parameters and data
 * query: ({ id, data }) => ({
 *   url: `/items/${id}`,
 *   method: 'PUT',
 *   data: data,
 *   params: { include: 'details' }
 * })
 */
export const axiosBaseQuery =
  (): BaseQueryFn<{
    url: string;
    method: AxiosRequestConfig["method"];
    data?: AxiosRequestConfig["data"];
    params?: AxiosRequestConfig["params"];
  }> =>
  async ({ url, method, data, params }) => {
    try {
      const result = await axiosClient({
        url,
        method,
        data,
        params,
      });
      return { data: result };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };
