import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook for redirection
import { userSignUp } from '../utils/API'; // Assuming you have a similar API function for signup
import toast, { Toaster } from 'react-hot-toast';

import {userJoiSchema} from '../utils/JoiValidation'



const SignUp: React.FC = () => {
    const [name, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const navigate = useNavigate();



    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handlePasswordConfirmChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordConfirm(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const userData = { name, email, password, passwordConfirm };
        const { error } = userJoiSchema.validate(userData, { abortEarly: false });

        
        if (error) {
            // If there are validation errors, display them using toast.error
          
            toast.error(error.details[0].message);
            return;
        }

        // If validation passes, proceed with signup
        try {
            const response = await userSignUp(name, email, password, passwordConfirm);
            if (response.status === 'success') {
                toast.success('Signup successful!');
                setTimeout(() => navigate('/items'), 2000);
            } else {
                toast.error('Signup failed: ' + response.message);
            }
        } catch (error) {
            toast.error('Signup failed: ' + error);
        }
    };

    return (
        <div className="w-full p-8">
     <Toaster 
    position="top-center"
    reverseOrder={false}
    toastOptions={{
        style: {
            border: '1px solid #E2E8F0', 
            padding: '16px 48px ', 
            color: '#1A202C', 
            backgroundColor: '#FFFFFF', 
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', 
            borderRadius: '8px', 
            fontSize: '20px', 
        },
        success: {
            style: {
                border: '1px solid #48BB78', 
                color: '#22543D', 
            },
        },
        error: {
            style: {
                border: '1px solid #F56565', 
                color: '#742A2A', 
            },
        },
    }}
/>
            <form onSubmit={handleSubmit}>
                <div className="mt-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Username</label>
                    <input
                        className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                        type="text"
                        value={name}
                        onChange={handleUsernameChange}
                    />
                </div>
                <div className="mt-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
                    <input
                        className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                    />
                </div>
                <div className="mt-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                    <input
                        className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </div>
                <div className="mt-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Confirm Password</label>
                    <input
                        className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                        type="password"
                        value={passwordConfirm}
                        onChange={handlePasswordConfirmChange}
                    />
                </div>
                <div className="mt-8">
                    <button type="submit" className="atom bg-gray-800 text-white font-bold py-2 px-4 w-full rounded hover:bg-black">Sign Up</button>
                </div>
            </form>
        </div>
    );
};

export default SignUp;
