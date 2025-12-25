import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const tagTypes = [
  "MachineData",
];

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: fetchBaseQuery({
    // baseUrl: `${BASE_URL}`,

    // prepareHeaders: (headers, { getState, endpoint }) => {
    //   const token =
    //     (getState() as RootState)?.auth?.accessToken ||
    //     localStorage.getItem(authTokenKeyName);
    //   if (token) {
    //     headers.set("x-access-token", token);
    //   }
    //   return headers;
    // },
  }),
  tagTypes: tagTypes,
  endpoints: () => ({}),
});

export default apiSlice;
