
import {
    fetchBaseQuery,
    type BaseQueryFn,
    type FetchArgs,
    type FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import getBaseurl from "./getBaseurl";
import { clearAuthStorage } from "./isTokenValid";

export function createAuthBaseQuery(path: string): BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> {
    const base = fetchBaseQuery({
        baseUrl: `${getBaseurl()}${path}`,
        credentials: "include",
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("token");
            if (token) headers.set("Authorization", `Bearer ${token}`);
            return headers;
        },
    });

    return async (args, api, extraOptions) => {
        const result = await base(args, api, extraOptions);
        if (result.error) {
            const status = result.error.status;
            if (status === 401 || status === 403) {
                clearAuthStorage();
                window.location.href = "/login";
            }
        }
        return result;
    };
}
