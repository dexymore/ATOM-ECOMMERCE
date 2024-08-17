import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useHistory hook for redirection
import { userLogin } from '../utils/API';
import toast, { Toaster } from 'react-hot-toast';

import {userLoginJoiSchema} from '../utils/JoiValidation'

const Login: React.FC = () => {
    const [email, setemail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleemail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setemail(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent) => {


        event.preventDefault();
        const userData = { email, password };
        const { error } = userLoginJoiSchema.validate(userData, { abortEarly: false });
        if (error) {
            // If there are validation errors, display them using toast.error
            toast.error(error.details[0].message);
            return;
        }
        try {
            const response = await userLogin(email, password); // Call userLogin function with username and password
            if (response.status=='success'            ) {
                toast.success('Login successful!'); // Use toast.success for success messages
                navigate('/Items');
            } else {
               console.log(response);
                toast.error('Login failed: ' + response.message); // Use toast.error for error messages
            }
        } catch (error) {
            // Handle login error
            toast.error('Login failed: ' + error);
        }
    };

    useEffect(() => {
        // Add any necessary effect logic here
    }, []);

    return (
        <div className="w-full p-8">
 <Toaster 
    position="top-center"
    reverseOrder={false}
    toastOptions={{
        style: {
            padding: '16px 48px', 
            color: '#ffffff',  // Default text color
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', 
            borderRadius: '8px', 
            fontSize: '20px', 
        },
        success: {
            style: {
                border: '1px solid #48BB30', 
                color: '#ffffff',  // Text color for success toast
                backgroundColor: '#48BB78',  
                
            },
        },
        error: {
            style: {
                border: '1px solid #F56565', 
                color: '#ffffff',  // Text color for error toast
                backgroundColor: '#F56565',  // Background color for error toast
            },
        },
    }}
/>

            <div className="  flex items-center justify-between"></div>
            <form onSubmit={handleSubmit}>
                <div className="">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
                    <input
                        className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                        type="email"
                        value={email}
                        onChange={handleemail}
                    />
                </div>
                <div className="mt-4">
                    <div className="flex justify-between">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                        <a href="#" className="text-xs text-gray-500">Forget Password?</a>
                    </div>
                    <input
                        className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </div>
                <div className="mt-8">
                    <button type="submit" className="bg-gray-800 atom text-white font-bold py-2 px-4 w-full rounded hover:bg-black">Login</button>
                </div>
            </form>
            <div className="mt-4 flex items-center justify-between">
                <span className="border-b w-1/5 md:w-1/4"></span>
                <a href="#" className="text-xs text-gray-500 uppercase">or sign up</a>
                <span className="border-b w-1/5 md:w-1/4"></span>
            </div>
        </div>
    );
};

export default Login;