import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://learning-portal-4wpx.onrender.com",
  }),
  keepUnusedDataFor: 600,
  endpoints: (builder) => ({}),
});
