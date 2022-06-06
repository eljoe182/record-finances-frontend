import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input, Label } from "../../components";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({
      username,
      email,
      password,
      passwordConfirm,
    });
    navigate("/auth/login");
  };

  return (
    <>
      <h1 className="text-3xl font-black text-center ">
        Record<span className="text-green-600">Finance</span>
      </h1>
      <div className="bg-white border-1 shadow-md px-5 py-10 rounded-lg mt-20">
        <form onSubmit={handleSubmit}>
          <div className="my-5">
            <Label text="Username" htmlFor="username" />
            <Input
              id="username"
              type="text"
              placeholder="How do you want to be called?"
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div className="my-5">
            <Label text="Email" htmlFor="email" />
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="my-5">
            <Label text="Password" htmlFor="password" />
            <Input
              id="password"
              type="password"
              placeholder="Set your password"
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div className="my-5">
            <Label text="Confirm password" htmlFor="password2" />
            <Input
              id="password2"
              type="password"
              placeholder="Confirm your password"
              onChange={(event) => setPasswordConfirm(event.target.value)}
            />
          </div>
          <div className="mt-10">
            <Button
              type="submit"
              label="Sign Up"
              color="primary"
              block={true}
            />
          </div>
          <nav className="mt-5 lg:flex lg:justify-between">
            <Link
              to="/auth/login"
              className="block text-center my-5 text-gray-500 hover:text-gray-600 transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/auth/forgot-password"
              className="block text-center my-5 text-gray-500 hover:text-gray-600 transition-colors"
            >
              Forgot password
            </Link>
          </nav>
        </form>
      </div>
    </>
  );
};

export default SignUpPage;
