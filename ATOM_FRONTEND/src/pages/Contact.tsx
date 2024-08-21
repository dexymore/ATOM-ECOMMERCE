import React from 'react';
import contactBg from "../assets/contactAssets/e9e6d2_6678cdc2b1ec45bd95800da57a18fde1~mv2.jpg";

const Contact: React.FC = () => {
    return (
        <section
            style={{ backgroundImage: `url(${contactBg})` }}
            className="bg-cover bg-center h-screen flex items-center justify-center"
        >
            <div className="bg-white w-full max-w-3xl py-6 px-8 mt-8 rounded-lg shadow-lg">
                <h2 className="mb-4 atom text-4xl tracking-tight font-extrabold text-center text-gray-900">
                    Contact Us
                </h2>
                <p className="mb-6 font-light text-center text-gray-500 sm:text-xl">
                    Got an issue? Want to send feedback about our products, Let us know.
                </p>
                <form action="#" className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                            Your email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                            placeholder="name@atom.com"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-900">
                            Subject
                        </label>
                        <input
                            type="text"
                            id="subject"
                            className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500"
                            placeholder="Let us know how we can help you"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900">
                            Your message
                        </label>
                        <textarea
                            id="message"
                            rows={4}
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                            placeholder="Leave a comment..."
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-slate-800 atom sm:w-fit hover:bg-black focus:ring-4 focus:outline-none "
                    >
                        Send message
                    </button>
                </form>
            </div>
        </section>
    );
};

export default Contact;
