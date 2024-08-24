import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { userSignUp } from "../utils/API";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth";
import { userJoiSchema } from "../utils/JoiValidation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

const SignUp: React.FC = () => {
  const [name, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

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
    const userData = { name, email, password, passwordConfirm };
    const { error } = userJoiSchema.validate(userData, { abortEarly: false });

    if (error) {
      

      toast.error(error.details[0].message, {
        duration: 5000,
        position: "top-center",
      });
      return;
    }

    try {
      setLoading(true);
      const response = await userSignUp(name, email, password, passwordConfirm);
      if (response.status === "success") {
        toast.success("Signup successful!", {
          duration: 5000,
          position: "top-center",
        });
        setTimeout(() => navigate("/items"), 2000);
        dispatch(authActions.login());
      } else {
        toast.error("Signup failed: " + response.message);
      }
    } catch (error) {
      toast.error("Signup failed: " + error, {
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
        <div className="mt-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Username
          </label>
          <input
            className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
            type="text"
            value={name}
            onChange={handleUsernameChange}
            placeholder="enter your username"
          />
        </div>
        <div className="mt-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email Address
          </label>
          <input
            className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="enter your email"
          />
        </div>
        <div className="mt-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
            type="password"
            value={password}
            onChange={handlePasswordChange

            }
            placeholder="enter your password"
          />
        </div>
        <div className="mt-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Confirm Password
          </label>
          <input
            className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
            type="password"
            value={passwordConfirm}
            onChange={handlePasswordConfirmChange}
            placeholder="confirm your password"
          />
        </div>
        <div className="mt-8">
          <button
            type="submit"
            className="atom bg-gray-800 text-white font-bold py-2 px-4 w-full rounded hover:bg-black"
          >
            {loading ? (
              <FontAwesomeIcon
                icon={faCircleNotch}
                className="h-5 w-5 animate-spin"
              />
            ) : (
              <span>Sign Up</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
