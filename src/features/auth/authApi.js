import { apiSlice } from "../api/apiSlice";
import { userLoggedIn } from "./authSlice";

const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // get users api
    getUsers: builder.query({
      query: () => `/users`,
    }),
    // user register api
    userRegister: builder.mutation({
      query: (data) => ({
        url: "/register",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data: auth } = await queryFulfilled;

          dispatch(
            userLoggedIn({
              accessToken: auth.accessToken,
              user: auth.user,
            })
          );

          localStorage.setItem(
            "auth",
            JSON.stringify({
              accessToken: auth.accessToken,
              user: auth.user,
            })
          );
        } catch (e) {}
      },
    }),
    // user login api
    userLogin: builder.mutation({
      query: (data) => ({
        url: `/login`,
        method: "POST",
        body: data,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data: auth } = await queryFulfilled;

          dispatch(
            userLoggedIn({
              accessToken: auth.accessToken,
              user: auth.user,
            })
          );

          localStorage.setItem(
            "auth",
            JSON.stringify({
              accessToken: auth.accessToken,
              user: auth.user,
            })
          );
        } catch (e) {}
      },
    }),
  }),
});

export const {
  useUserLoginMutation,
  useUserRegisterMutation,
  useGetUsersQuery,
} = authApi;
