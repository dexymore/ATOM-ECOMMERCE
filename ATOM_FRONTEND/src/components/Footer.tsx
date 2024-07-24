import React from "react";
import NewsTeller from "../sections/NewsTeller";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";

import { faSquareGithub } from "@fortawesome/free-brands-svg-icons";
import { faSquareFacebook } from "@fortawesome/free-brands-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";

const Footer: React.FC = () => {
  return (
    <>
      {/* <NewsTeller/> */}
      <footer className=" z-20 w-full p-4 border-t  shadow-lg  bg-slate-50 custom-shadow-top  border-white md:flex-col  md:items-center md:justify-between md:p-6   ">
        {/* <span className="text-sm text-black sm:text-center ">© 2023 <a href="" className="hover:underline">ATOM™</a>. All Rights Reserved.
        </span> */}
        <div className="w-full flex md:flex-row flex-col">
          <div className=" flex-1">
            <h1 className="self-center underline text-2xl font-semibold whitespace-nowrap ">
              ATOM
              <span className="text-sm text-black sm:text-center  ">
                © 2024
              </span>
            </h1>
          </div>
          <div className=" flex-1">
            <h2 className="underline">policy</h2>
            <ul className="flex-col flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">
                  Licensing
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div className=" flex-1">
            <h2 className="underline">main menu</h2>
            <ul className="flex-col flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">
                  Licensing
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div className=" flex-1">
            <h2 className="underline">subscribe with us</h2>
            <ul className="flex-col flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">
                  get updates from us
                </a>
              </li>
              <li>
                <div className="relative w-[65%]">
                  <input
                    className="block w-full p-1 text-sm bg-transparent  border-b-2 border-black pr-10"
                    type="email"
                    id="email"
                    required
                  />
                  <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      size="lg"
                      className="text-black"
                    />
                  </span>
                </div>
              </li>
              <li>
                <div className="w-[25%]  flex flex-row justify-between mt-3">
                  <a className="">
                    <FontAwesomeIcon
                      icon={faSquareGithub}
                      size="2xl"
                      className="hover:text-black"
                    />
                  </a>
                  <a className="">
                    <FontAwesomeIcon
                      icon={faSquareFacebook}
                      size="2xl"
                      className="hover:text-blue-900"
                    />
                  </a>
                  <a className="">
                    <FontAwesomeIcon
                      icon={faLinkedin}
                      size="2xl"
                      className="hover:text-blue-600"
                    />
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
