import React, { useState } from "react";
import { supabase_public } from "@/utils/supabase-public";

// FUNCTIONS
import { isValidEmail } from "@/functions/helper";

const AuthModal = () => {
  const [email, setEmail] = React.useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  const onClickButton = () => {
    setError("");
    if (isValidEmail(email)) login();
    else setError("Invalid Email Format");
  };

  const login = async () => {
    const { data, error } = await supabase_public.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: "http://localhost:3000/",
      },
    });
    if (error) setError(error.message);
    else {
      setSuccess(true);
      setEmail("");
      setError("");
    }
  };

  return (
    <>
      <input type="checkbox" id="auth-modal" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <label
            htmlFor="auth-modal"
            className="btn hover:bg-transparent btn-sm btn-circle bg-transparent text-black absolute right-2 top-2"
          >
            ✕
          </label>

          <h3 className="font-bold text-xl text-center my-4">Login / Signup</h3>
          <div className="form-control w-full mt-10">
            <label className="label">
              <span className="label-text">Enter Email</span>
            </label>
            <input
              type="text"
              placeholder="sample@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="input input-bordered w-full"
            />
          </div>

          <button
            onClick={onClickButton}
            className="btn w-full rounded-none hover:bg-yellow-500 text-black bg-transparent hover:text-white mt-14"
          >
            Login / Signup
          </button>
          <p className="text-error text-sm text-center mt-2">{error}</p>
          {success && (
            <p className="text-success text-sm text-center">
              Check your email for a login link!
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default AuthModal;
