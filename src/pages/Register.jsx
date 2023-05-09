import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// import components
import Form from "../components/Form";
import Input from "../components/Input/Input";

// RTK query hook
import { useUserRegisterMutation } from "../features/auth/authApi";
import Error from "../components/Ui/Error";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState(undefined);

  const navigate = useNavigate();

  // user register
  const [userRegister, { isSuccess, isLoading, isError, error: resError }] =
    useUserRegisterMutation();

  // user
  const user = { name, email, password, role: "student" };

  const handelSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError(`Password don't match`);
    }
    if (password === confirmPassword) {
      userRegister(user);
    }
  };

  useEffect(() => {
    if (isError) {
      setError(resError.data);
    }
  }, [isError]);

  // If register is successful navigate to the player page
  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
  }, [isSuccess, navigate]);

  return (
    <Form title=" Create Your New Account" onSubmit={handelSubmit}>
      {/* Inputs */}
      <div className="rounded-md shadow-sm -space-y-px">
        {/* Student Name */}
        <Input
          id="name"
          name="name"
          htmlFor="name"
          type="text"
          autoComplete="name"
          classNamees="rounded-t-md"
          placeholder="Student Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* Email Address */}
        <Input
          htmlFor="email-address"
          id="email-address"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <Input
          htmlFor="password"
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Confirm Password */}
        <Input
          htmlFor="confirm-password"
          id="confirm-password"
          name="confirm-password"
          type="password"
          autoComplete="confirm-password"
          placeholder="Confirm Password"
          classNamees="rounded-b-md"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

      {/* submit button */}
      <div>
        <button
          disabled={isLoading}
          type="submit"
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
        >
          Create Account
        </button>
      </div>
      {(error || isError) && <Error message={error} />}
    </Form>
  );
};

export default Register;
