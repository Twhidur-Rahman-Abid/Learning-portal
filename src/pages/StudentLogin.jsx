import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// import components
import Form from "../components/Form";
import Input from "../components/Input/Input";

// RTK query hook
import {
  useGetUsersQuery,
  useUserLoginMutation,
} from "../features/auth/authApi";
import Error from "../components/Ui/Error";
import Worning from "../components/Ui/Worning";

const StudentLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [worning, setWorning] = useState("");
  const navigate = useNavigate();

  const { data: users } = useGetUsersQuery();
  const userRole = users?.find((user) => user.email === email)?.role;
  const [userLogin, { isLoading, isSuccess, isError, error: resposeError }] =
    useUserLoginMutation();

  // handle submit
  const handelSubmit = (e) => {
    e.preventDefault();
    if (userRole === "admin") {
      setWorning("Only student users can login! ");
    } else {
      userLogin({ email, password });
    }
  };

  // If is login successful navigate to the player page
  useEffect(() => {
    if (isSuccess) {
      navigate("/player");
      console.log("yes");
    }
  }, [isSuccess, navigate]);

  return (
    <Form title="Sign in to Student Account" onSubmit={handelSubmit}>
      <div className="rounded-md shadow-sm -space-y-px">
        {/* Email */}
        <Input
          type="email"
          autoComplete="email"
          name="email"
          classNamees="rounded-t-md"
          id="email-address"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <Input
          type="password"
          autoComplete="current-password"
          name="password"
          classNamees="rounded-b-md"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm">
          New student ?{" "}
          <Link
            to="/register"
            className="font-medium text-violet-600 hover:text-violet-500"
          >
            Register
          </Link>
        </div>
        <div className="text-sm">
          <Link className="font-medium text-violet-600 hover:text-violet-500">
            Forgot your password?
          </Link>
        </div>
      </div>

      <div>
        <button
          disabled={isLoading}
          type="submit"
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
        >
          Sign in
        </button>
      </div>

      {worning && (
        <Worning
          message={worning}
          link="Admin login"
          to="/admin/login"
          onClick={() => setWorning("")}
        />
      )}
      {isError && <Error message={resposeError?.data} />}
    </Form>
  );
};

export default StudentLogin;
