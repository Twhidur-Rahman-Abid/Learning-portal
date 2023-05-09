import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Form from "../components/Form";
import Input from "../components/Input/Input";
import Worning from "../components/Ui/Worning";
import Error from "../components/Ui/Error";

import {
  useGetUsersQuery,
  useUserLoginMutation,
} from "../features/auth/authApi";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [worning, setWorning] = useState("");

  const navigate = useNavigate();

  // RTK query hooks
  const { data: users } = useGetUsersQuery();
  const [userLogin, { isSuccess, isError, error: responseError }] =
    useUserLoginMutation();

  // find the user role
  const userRole = users?.find((user) => user.email === email)?.role;

  // hable submit
  const handelSubmit = (e) => {
    e.preventDefault();
    if (userRole !== "admin") {
      setWorning("Only admin users can login! . ");
    } else {
      userLogin({ email, password });
    }
  };

  // if user logged in successfully, redirect to the dashboard page
  useEffect(() => {
    if (isSuccess) {
      navigate("admin/dashboard");
    }
  }, [isSuccess, navigate]);

  return (
    <Form title="Sign in to Admin Account" onSubmit={handelSubmit}>
      <div className="rounded-md shadow-sm -space-y-px">
        <Input
          type="email"
          htmlFor="email-address"
          autoComplete="email"
          name="email"
          classNamees="rounded-t-md"
          id="email-address"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          type="password"
          htmlFor="password"
          autoComplete="current-password"
          name="password"
          classNamees="rounded-b-md"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="flex items-center justify-end">
        <div className="text-sm">
          <Link className="font-medium text-violet-600 hover:text-violet-500">
            Forgot your password?
          </Link>
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
        >
          Sign in
        </button>
      </div>

      {worning && (
        <Worning
          message={worning}
          link="Student login"
          to="/"
          onClick={() => setWorning("")}
        />
      )}
      {isError && <Error message={responseError?.data} />}
    </Form>
  );
};

export default AdminLogin;
