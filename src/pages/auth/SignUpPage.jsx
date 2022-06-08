import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input, Label, Loading } from "../../components";
import { signUp } from "../../services/auth.api";
import { toast } from "react-hot-toast";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (username.length < 3) {
      toast.error("Username must be at least 3 characters");
      return;
    }

    if (
      RegExp(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      ).test(email) === false
    ) {
      toast.error("Email must be valid");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (password !== passwordConfirm) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    await signUp({
      username,
      email,
      password,
    })
      .then(() => {
        navigate("/auth/login");
      })
      .catch((error) => {
        toast.error(error.message);
      });
    setLoading(false);
  };

  return (
    <>
      <h1 className="text-3xl font-black text-center ">
        Record<span className="text-green-600">Finance</span>
      </h1>
      <div className="bg-white border-1 shadow-md p-5 rounded-lg mt-10">
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
          <div className="mt-5">
            {loading ? (
              <>
                <Loading show={loading} />
              </>
            ) : (
              <>
                <Button
                  type="submit"
                  label="Sign Up"
                  color="primary"
                  block={true}
                />
              </>
            )}
          </div>
          <nav className="mt-5 lg:flex lg:justify-between px-5">
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
