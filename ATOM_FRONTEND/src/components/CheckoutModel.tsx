import React, { useState, useEffect } from "react";
import { createOrderCheckout } from "../utils/API";
import Joi from "joi";
import { loadStripe } from "@stripe/stripe-js";
import { userCheckoutSchema } from "../utils/JoiValidation"; 
import toast, { Toaster } from "react-hot-toast";
import { faCreditCard, faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
const stripePromise = loadStripe(
  stripePublicKey as string
);

interface CheckoutModelProps {
  isOpen: boolean;
  toggleCheckModal: () => void;
}

const CheckoutModel: React.FC<CheckoutModelProps> = ({
  isOpen,
  toggleCheckModal,
}) => {
  const [formData, setFormData] = useState({
    address: "",
    phone_number: "",
    delivery: "",
    special_note: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }, [isOpen]);

  const handleOverlayClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.target === e.currentTarget) {
      toggleCheckModal();
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { error } = userCheckoutSchema.validate(formData, {
      abortEarly: false,
    });

    if (error) {
      const newErrors: { [key: string]: string } = {};
      error.details.forEach((err) => {
        newErrors[err.path[0]] = err.message;
      });
      setErrors(newErrors);
    } else {
      setErrors({});
      await handleCheckout();
    }
  };

  const handleCheckout = async () => {
    try {
      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error("Stripe.js failed to load.");
      }

      setLoading(true);
      const sessionId = await createOrderCheckout(formData);
      const { error } = await stripe.redirectToCheckout({ sessionId });

      if (error) {
        console.error(error.message);
      }
    } catch (error) {
      toast.error(
        "An error occurred while processing your order. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster
        position="bottom-left"
        reverseOrder={false}
        toastOptions={{
          style: {
            padding: "16px 48px",
            color: "#ffffff",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
            fontSize: "20px",
          },
          success: {
            style: {
              border: "1px solid #48BB30",
              color: "#ffffff",
              backgroundColor: "#48BB78",
            },
          },
          error: {
            style: {
              border: "1px solid #F56565",
              color: "#ffffff",
              backgroundColor: "#F56565",
            },
          },
        }}
      />
      <div
        id="crud-modal"
        tabIndex={1}
        aria-hidden="true"
        className={`fixed inset-0 z-50 flex justify-center items-center ${
          isOpen ? "block" : "hidden"
        }`}
        onClick={handleOverlayClick}
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
              <h3 className="text-lg font-semibold text-gray-900">
                Checkout Info
              </h3>
              <button
                type="button"
                className="atom text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                onClick={toggleCheckModal}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <form className="p-4 md:p-5" onSubmit={handleSubmit}>
              <div className="grid gap-4 mb-4 grid-cols-2">
                <div className="col-span-2">
                  <label
                    htmlFor="address"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    id="address"
                    className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ${
                      errors.address ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Type your address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                  {errors.address && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.address}
                    </p>
                  )}
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="phone_number"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Phone Number
                  </label>
                  <input
                    type="text"
                    name="phone_number"
                    id="phone_number"
                    className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ${
                      errors.phone_number ? "border-red-500" : "border-gray-300"
                    }`}
       
                    placeholder="Phone number"
                    value={formData.phone_number}
                    onChange={handleChange}
                  />
                  {errors.phone_number && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.phone_number}
                    </p>
                  )}
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="delivery"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Delivery
                  </label>
                  <select
                    id="delivery"
                    name="delivery"
                    className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 ${
                      errors.delivery ? "border-red-500" : "border-gray-300"
                    }`}
                    value={formData.delivery}
                    onChange={handleChange}
                  >
                    <option value="">Select delivery option</option>
                    <option value="Delivery to address">
                      Delivery to address
                    </option>
                    <option value="Receive from the nearest Atom branch">
                      Receive from the nearest Atom branch
                    </option>
                  </select>
                  {errors.delivery && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.delivery}
                    </p>
                  )}
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="special_note"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Special Note
                  </label>
                  <textarea
                    id="special_note"
                    name="special_note"
                    rows={4}
                    className={`block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border focus:ring-blue-500 focus:border-blue-500 ${
                      errors.special_note ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Write a special note here"
                    value={formData.special_note}
                    onChange={handleChange}
                  ></textarea>
                  {errors.special_note && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.special_note}
                    </p>
                  )}
                </div>
              </div>
              <button
                type="submit"
                className="atom text-white inline-flex items-center bg-slate-800 hover:bg-slate-950 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center">
                    <FontAwesomeIcon
                      icon={faCircleNotch}
                      className="h-5 w-5 animate-spin"
                    />
                  </div>
                ) : (
                  <>
                    Confirm Paying
                    <FontAwesomeIcon icon={faCreditCard} className="ml-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutModel;
