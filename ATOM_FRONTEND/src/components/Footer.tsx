import React from "react";
import NewsTeller from "../sections/NewsTeller";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import {
  faSquareGithub,
  faSquareFacebook,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

const Footer: React.FC = () => {
  return (
    <>
      {/* <NewsTeller/> */}
      <footer className="z-20 w-full p-4 border-t shadow-lg bg-slate-50 custom-shadow-top border-white md:flex md:flex-col md:items-center md:justify-between md:p-6">
        <div className="w-full flex md:flex-row flex-col">
          <div className="flex-1">
            <h1 className="self-center atom underline text-2xl font-semibold whitespace-nowrap">
              AToM
              <span className="text-sm text-black sm:text-center">© 2024</span>
            </h1>
          </div>
          <div className="flex-1">
            <h2 className="underline">Policy</h2>
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
          <div className="flex-1">
            <h2 className="underline">Main Menu</h2>
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
          <div className="flex-1">
            <h2 className="underline">Subscribe with Us</h2>
            <ul className="flex-col flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">
                  Get updates from us
                </a>
              </li>
              <li>
                <div className="relative w-[65%]">
                  <input
                    className="block w-full p-1 text-sm bg-transparent border-b-2 border-black pr-10"
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
                <div className="w-[25%] flex flex-row justify-between mt-3">
                  <a href="#">
                    <FontAwesomeIcon
                      icon={faSquareGithub}
                      size="2xl"
                      className="hover:text-black"
                    />
                  </a>
                  <a href="#">
                    <FontAwesomeIcon
                      icon={faSquareFacebook}
                      size="2xl"
                      className="hover:text-blue-900"
                    />
                  </a>
                  <a href="#">
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
        <div className="relative w-full mt-5">
          <div
            className="absolute md:mx-12 inset-x-0 top-0 border-t border-gray-300 "
           
          ></div>
          <div className="relative z-10 p-4">
            <p className="text-start text-xs md:mx-14 text-gray-600">
              Images, logos, and videos are not owned by me and are used only to
              enhance the design of the website, not for commercial purposes.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
