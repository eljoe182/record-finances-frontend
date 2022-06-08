import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { Button, Input, Label, Loading } from "../../components";
import { envelop } from "../../helpers/icons";
import { forgotPassword } from "../../services/auth.api";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Email is required");
      return;
    }

    setLoading(true);
    await forgotPassword({
      email,
    })
      .then(() => {
        toast.success("Email sent");
        setEmail("");
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
      <div className="bg-white border-1 shadow-md p-5 rounded-lg mt-10 xs:mt-5">
        <form onSubmit={handleSubmit}>
          <div className="my-5">
            <Label text="Enter your email for recovery" htmlFor="email" />
            <Input
              icon={envelop}
              id="email"
              type="email"
              placeholder="user@domain.ltd"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
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
                  label="Send recovery email"
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
              to="/auth/signup"
              className="block text-center my-5 text-gray-500 hover:text-gray-600 transition-colors"
            >
              Sign Up
            </Link>
          </nav>
        </form>
      </div>
    </>
  );
};

export default ForgotPasswordPage;
