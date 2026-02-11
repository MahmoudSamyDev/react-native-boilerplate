import axios from "axios";

// query-string: Used to serialize query parameters in a cleaner way than the default axios serializer.
import queryString from "query-string";

/**
 * Base URL for API requests, loaded from environment variables.
 */
const baseUrl = process.env.EXPO_PUBLIC_API_URL as string;

/**
 * Customized Axios instance configured for API requests.
 *
 * Features:
 * - Automatic base URL prepending
 * - Credential inclusion (cookies) for authentication
 * - Clean query parameter serialization using query-string
 * - Request interceptor that sets Content-Type header
 * - Response interceptor that extracts data and handles errors
 *
 * Authentication is handled automatically via HTTP-only cookies with `withCredentials: true`.
 * The response interceptor automatically extracts the `data` property from successful responses.
 */
const axiosClient = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
  paramsSerializer: (params) => queryString.stringify(params),
});

// This interceptor runs before every request:
// request interceptor: Adds the 'Content-Type' header to all requests.
// Authentication is handled automatically via HTTP-only cookies with withCredentials: true.
axiosClient.interceptors.request.use(async (config) => {
  config.headers.set("Content-Type", "application/json");

  // Apply cookies if they exist in the config
  if (config.headers.Cookie) {
    config.headers.set("Cookie", config.headers.Cookie);
  }

  return config;
});

// This runs after a response is received
// response interceptor: If the response has data, it returns that data. Otherwise, it just returns the response.
// If there's an error, it checks if the error has a response. If not, it alerts the user.
// If there is a response, it throws the error response to be handled by the UI.
// response interceptor
axiosClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (!error.response) {
      alert(error);
      return;
    }
    throw error;
  },
);

// Exporting the Client
export default axiosClient;

/**
 * Creates a server-side request client that forwards cookies from the incoming request.
 *
 * This helper function is designed for server-side rendering (SSR) scenarios, such as
 * Remix loaders or Next.js API routes. It creates an axios-like client that automatically
 * includes cookies from the incoming request, allowing server-side code to make authenticated
 * API calls on behalf of the user.
 *
 * @param {Request} request - The incoming HTTP request object containing cookies in headers.
 * @returns {Object} An object with methods (get, post, put, delete) that mirror axios methods
 *                  but automatically include cookies from the request.
 *
 * @example
 * // In a Remix loader
 * export async function loader({ request }: LoaderArgs) {
 *   const api = createServerRequest(request);
 *   const profile = await api.get('/profile/me');
 *   return json({ profile });
 * }
 *
 * @example
 * // Making authenticated requests
 * const api = createServerRequest(request);
 * const tournaments = await api.get('/tournaments', { params: { status: 'active' } });
 * const newTournament = await api.post('/tournaments', tournamentData);
 */
export const createServerRequest = (request: Request) => {
  return {
    get: (url: string, config?: any) =>
      axiosClient.get(url, {
        ...config,
        headers: {
          ...config?.headers,
          Cookie: request.headers.get("Cookie") || "",
        },
      }),
    post: (url: string, data?: any, config?: any) =>
      axiosClient.post(url, data, {
        ...config,
        headers: {
          ...config?.headers,
          Cookie: request.headers.get("Cookie") || "",
        },
      }),
    put: (url: string, data?: any, config?: any) =>
      axiosClient.put(url, data, {
        ...config,
        headers: {
          ...config?.headers,
          Cookie: request.headers.get("Cookie") || "",
        },
      }),
    delete: (url: string, config?: any) =>
      axiosClient.delete(url, {
        ...config,
        headers: {
          ...config?.headers,
          Cookie: request.headers.get("Cookie") || "",
        },
      }),
  };
};
