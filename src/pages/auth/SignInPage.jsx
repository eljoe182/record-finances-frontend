import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input, Label } from "../../components";
import { signIn } from "../../services/auth.api";
import toast from "react-hot-toast";
import { envelop, key } from "../../helpers/icons";

const SignInPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    await signIn({
      email,
      password,
    })
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <>
      <h1 className="text-3xl font-black text-center ">
        Record<span className="text-green-600">Finance</span>
      </h1>
      <div className="bg-white border-1 shadow-md px-5 py-10 rounded-lg mt-20">
        <form onSubmit={handleSubmit}>
          <div className="my-5">
            <Label text="Email" htmlFor="email" />
            <Input
              icon={envelop}
              id="email"
              type="email"
              placeholder="Enter your email"
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="my-5">
            <Label text="Password" htmlFor="password" />
            <Input
              icon={key}
              id="password"
              type="password"
              placeholder="Enter your password"
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div className="mt-10">
            <Button
              type="submit"
              label="Sign in"
              color="primary"
              block={true}
            />
          </div>
          <nav className="mt-5 lg:flex lg:justify-between">
            <Link
              to="/auth/signup"
              className="block text-center my-5 text-gray-500 hover:text-gray-600 transition-colors"
            >
              Sign up
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

export default SignInPage;
