import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { resetPassword } from "../utils/API";
import {userResetPasswordSchema} from "../utils/JoiValidation";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

const ResetPassword: React.FC = () => {
  const { token } = useParams<{ token: string }>(); // Get token from URL params
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [loading, setLoading] = useState(false);


  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handlePasswordConfirmChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPasswordConfirm(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); 
    const userData = { password, passwordConfirm };
    const { error } = userResetPasswordSchema.validate(userData, {
      abortEarly: false,
    });
    if (error) {
      toast.error(error.details[0].message);
      return;
    }

    try {
      setLoading(true);
      if (!token) {
      toast.error("Token not found.");
        throw new Error("Token not found.");
      }
      const response = await resetPassword(token, password, passwordConfirm);
      if (response.status === "success") {
        toast.success("Password reset successfully.");
        navigate("/auth");
      } else {
        toast.error("Password reset failed. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred: " + error);
    } finally {
      setLoading(false);
    }
 
};

  return (
    <div className="flex items-center justify-center min-h-screen flex-col">
             <div className="">
            <h1 className="atom text-4xl p-[10px]  md:text-3xl bg-clip-text text-transparent bg-gradient-to-b from-yellow-600 to-red-900 text-center font-sans font-bold hover:to-slate-800 hover:from-red-900 ">
                AToM
            </h1>
        </div>
      <div className="md:w-[30%] w-[80%] p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">Reset Password</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              New Password
            </label>
            <input
              className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
              type="password"
              value={password}
              onChange={handlePasswordChange
              }
              placeholder="Enter new password"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Confirm Password
            </label>
            <input
              className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
              type="password"
              value={passwordConfirm}
              onChange={handlePasswordConfirmChange}
              placeholder="Confirm your new password"
            />
          </div>
          <button
            type="submit"
            className="bg-gray-800 atom text-white font-bold py-2 px-4 w-full rounded hover:bg-black"
            disabled={loading}
          >{loading ? (
            <FontAwesomeIcon
              icon={faCircleNotch}
              className="h-5 w-5 animate-spin"
            />
          ) : (
            <span>confirm change</span>
          )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
