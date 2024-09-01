import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useState } from "react";
import { userForgotPasswordSchema } from "../utils/JoiValidation";
import { toast } from "react-hot-toast";
import {submitForgotPassword} from "../utils/API";
const ForgetPassword: React.FC = () => {
  const  handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); 
    const userData = { email };
    const { error } = userForgotPasswordSchema.validate(userData, {
      abortEarly: false,
    });
    if (error) {
      toast.error(error.details[0].message);
      return;
    }
try{
    setLoading(true);
    const response=await submitForgotPassword(email);
    if(response.status==="success"){
    toast.success("Password reset email sent successfully!", {
      duration: 5000,
      position: "top-center",
    });
    setEmail("");
    setLoading(false);}
}
catch(error){
    toast.error("Failed to send password reset email: " + error, {
      duration: 5000,
      position: "top-center",
    });
    setLoading(false);
}
finally{
    setLoading(false);
}
 

  };
  const [email, setEmail] = useState("");
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen flex-col">
        <div className="">
            <h1 className="atom text-4xl p-[10px]  md:text-3xl bg-clip-text text-transparent bg-gradient-to-b from-yellow-600 to-red-900 text-center font-sans font-bold hover:to-slate-800 hover:from-red-900 ">
                AToM
            </h1>
        </div>
      <div className="md:w-[30%] w-[80%] p-8 rounded-lg shadow-lg">
        <div className="flex mt-2 mb-6 justify-center w-full ">
          <h1 className="text-2xl font-bold text-gray-800">Forget Password</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email Address
            </label>
            <input
              className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
              type="email"
              value={email}

              title="enter your email"
              onChange={handleEmailChange}
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
                <span>Submit Email</span>
              )}
            </button>
          </div>
        </form>
        <div className="mt-4 flex items-center justify-between"></div>
      </div>
    </div>
  );
};

export default ForgetPassword;
