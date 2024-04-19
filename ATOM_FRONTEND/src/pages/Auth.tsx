import React, { useState } from 'react';
import Login from '../components/Login';
import Signup from '../components/Signup';
import { BackgroundBeamsDemo } from '../sections/BackgroundBeams';

const Auth: React.FC = () => {
    const [activeTab, setActiveTab] = useState('login');

    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
    };

    return (
        <>
            <div className="py-12 px-12">
                <div className="flex w-full rounded-lg shadow-lg overflow-hidden mx-auto max-w-5xl">
                    <div className="hidden lg:block w-full ">
                        <BackgroundBeamsDemo />
                    </div>
                    <div className="w-full lg:w-full">
                        <div className="text-sm font-medium text-center text-salute-900 border-b border-gray-20">
                            <ul className="flex flex-wrap -mb-px">
                                <li className="w-1/2">
                                    <a href="#" className={`inline-block p-4 border-b-2 border-transparent rounded-t-lg ${activeTab === 'login' ? 'hover:border-gray-300 hover:text-gray-500' : ''} ${activeTab === 'login' ? 'text-blue-600 border-blue-600' : ''}`} onClick={() => handleTabChange('login')}>Login</a>
                                </li>
                                <li className="w-1/2">
                                    <a href="#" className={`inline-block p-4 border-b-2 border-transparent rounded-t-lg ${activeTab === 'signup' ? 'hover:border-gray-300 hover:text-gray-500' : ''} ${activeTab === 'signup' ? 'active dark:text-blue-500 dark:border-blue-500' : ''}`} onClick={() => handleTabChange('signup')} aria-current={activeTab === 'signup' ? 'page' : undefined}>Signup</a>
                                </li>
                            </ul>
                        </div>
                        {activeTab === 'login' ? <Login /> : <Signup />}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Auth;

