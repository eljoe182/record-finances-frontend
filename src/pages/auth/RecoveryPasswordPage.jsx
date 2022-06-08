import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Input, Label, Loading } from "../../components";
import { resetPassword } from "../../services/auth.api";

const RecoveryPasswordPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (password !== passwordConfirm) {
      toast.error("Passwords do not match");
      return;
    }
    setLoading(true);
    await resetPassword({
      token: id,
      password,
    })
      .then(() => {
        toast.success("Password changed");
        navigate("/auth/login");
      })
      .catch(async (error) => {
        const { message } = await error;
        toast.error(message);
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
            <Label text="New password" htmlFor="password" />
            <Input
              id="password"
              type="password"
              placeholder="Set new password"
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
          <div className="my-5">
            {loading ? (
              <>
                <Loading show={loading} />
              </>
            ) : (
              <>
                <Button
                  type="submit"
                  label="Reset password"
                  color="primary"
                  block={true}
                />
              </>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default RecoveryPasswordPage;
