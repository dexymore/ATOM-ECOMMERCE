import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../utils/API";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth";
import { userLoginJoiSchema } from "../utils/JoiValidation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const userData = { email, password };
    const { error } = userLoginJoiSchema.validate(userData, {
      abortEarly: false,
    });
    if (error) {
      toast.error(error.details[0].message);
      return;
    }
    try {
      setLoading(true);
      const response = await userLogin(email, password);
      if (response.status === "success") {
        toast.success("Login successful!", {
          duration: 5000,
          position: "top-center",
        });
        dispatch(authActions.login());

        navigate("/Items");
      } else {
        toast.error("Login failed: " + response.message, {
          duration: 5000,
          position: "top-center",
        });
      }
    } catch (error) {
      toast.error("Login failed: " + error, {
        duration: 5000,
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full p-8">
      <form onSubmit={handleSubmit}>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email Address
          </label>
          <input
            className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
            type="email"
            value={email}
            placeholder="enter your email"
            onChange={handleEmailChange}
          />
        </div>
        <div className="mt-4">
          <div className="flex justify-between">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <a href="#" className="text-xs text-gray-500">
              Forget Password?
            </a>
          </div>
          <label className="hidden text-gray-700 text-sm font-bold mb-2">"</label>
          <input
            className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="enter your password"

          />
        </div>
        <div className="mt-8">
          <button
            type="submit"
            className="bg-gray-800 atom text-white font-bold py-2 px-4 w-full rounded hover:bg-black"
          >
            {loading ? (
              <FontAwesomeIcon
                icon={faCircleNotch}
                className="h-5 w-5 animate-spin"
              />
            ) : (
              <span>Login</span>
            )}
          </button>
        </div>
      </form>
      <div className="mt-4 flex items-center justify-between">
        <span className="border-b w-1/5 md:w-1/4"></span>
        <a href="#" className="text-xs text-gray-500 uppercase">
          or sign up
        </a>
        <span className="border-b w-1/5 md:w-1/4"></span>
      </div>
    </div>
  );
};

export default Login;
