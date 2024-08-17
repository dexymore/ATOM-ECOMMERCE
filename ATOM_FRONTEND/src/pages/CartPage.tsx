import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/index";
import { fetchCart } from "../store/cartThunks";
import ItemsCard from "../components/ItemsCard";
import { getItems } from "../utils/API";
import {
  removeFromCart,
  addToCart,
  removeOneItemInstance,
  createOrderCheckout,
} from "../utils/API";
import toast, { Toaster } from "react-hot-toast";

import { createCheckoutSession } from "../services/checkoutService";
import CheckoutModel from "../components/CheckoutModel";
import ViewModel from "../components/ViewModel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

interface Image {
  public_id: string;
  url: string;
  _id: string;
}
interface Item {
  _id: string;
  name: string;
  description: string;
  price: number;
  images: Image[];
}

const CartPage: React.FC = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [savings, setSavings] = useState<number>(0);
  const [tax, setTax] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [storePickup, setStorePickup] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [viewItemId, setViewItemId] = useState<string | undefined>(undefined);

  const toggleViewModal = () => {
    setIsViewModalOpen(!isViewModalOpen);
 
  };
  const toggleCheckModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const [cartLoading, setCartLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadCart = async () => {
       setCartLoading(true);
      try {
        await dispatch(fetchCart());
      } catch (error) {
        console.error("Failed to fetch cart:", error);
      } finally {
         setCartLoading(false);
      }
    };

    loadCart();
  }, [dispatch]);
  useEffect(() => {
    if (cart.totalPrice > 0) {
      const newSavings = cart.totalPrice * 0.05;
      const newTax = cart.totalPrice * 0.1;
      const newStorePickup = cart.items.length * 2;
      const newTotal = cart.totalPrice - newSavings + newTax + newStorePickup;
      setSavings(newSavings);
      setTax(newTax);
      setStorePickup(newStorePickup);
      setTotal(newTotal);
    } else {
      setTotal(0);
      setSavings(0);
      setTax(0);
      setStorePickup(0);
    }
  }, [cart.totalPrice, cart.items]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const fetchedItems = await getItems();
        setItems(fetchedItems);
      } catch (error) {
        setError("Failed to fetch items");
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const handleRemoveFromCart = async (itemId: string) => {
    try {
      await removeFromCart(itemId);
      dispatch(fetchCart());

      setTimeout(() => {
        toast.success("Item removed from cart");
      }, 500);
    } catch (error) {
      console.error("Error removing item from cart:", error);
      setTimeout(() => {
        toast.error("Error removing item from cart");
      }, 500);
    }
  };

  // Handle add item to cart
  const handleAddToCart = async (itemId: string) => {
    try {
      await addToCart(itemId);
      dispatch(fetchCart());
      setTimeout(() => {
        toast.success("Item added to cart");
      }, 500);
    } catch (error) {
      setTimeout(() => {
        toast.error("Error adding item to cart");
      }, 500);
      console.error("Error adding item to cart:", error);
    }
  };

  const handleRemoveAllInstances = async (itemId: string) => {
    try {
      await removeOneItemInstance(itemId);
      dispatch(fetchCart());
      setTimeout(() => {
        toast.success("All instances removed from cart");
      }, 500);
    } catch (error) {
      console.error("Error removing all instances from cart:", error);
      setTimeout(() => {
        toast.error("Error removing all instances from cart");
      });
    }
  };

  const handlevoucher = (e: any) => {
    e.preventDefault();
    toast.error("this is not a valid voucher");
  };

  return (
    <>
      <Toaster
        position="bottom-left"
        reverseOrder={false}
        toastOptions={{
          style: {
            padding: "16px 48px",
            color: "#ffffff", // Default text color
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
            fontSize: "20px",
          },
          success: {
            style: {
              border: "1px solid #48BB30",
              color: "#ffffff", // Text color for success toast
              backgroundColor: "#48BB78",
            },
          },
          error: {
            style: {
              border: "1px solid #F56565",
              color: "#ffffff", // Text color for error toast
              backgroundColor: "#F56565", // Background color for error toast
            },
          },
        }}
      />

   {  cartLoading? (
     <div className="flex items-center justify-center w-full h-[600px]">
     <FontAwesomeIcon
       icon={faCircleNotch}
       className="text-black h-12 w-12 animate-spin"
     />
   </div>
   ):(<section className="bg-white py-8">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
            <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
              <div className="space-y-6">
                {cart.items.map((cartItem) => (
                  <div
                    key={cartItem.itemId._id}
                    className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm md:p-6"
                  >
                    <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                      <a href="#" className="shrink-0 md:order-1">
                        <img
                          className="h-20 w-20"
                          src={cartItem.itemId.images[0].url}
                          alt={cartItem.itemId.name}
                        />
                        <img
                          className="hidden h-40 w-30"
                          src={cartItem.itemId.images[0].url}
                          alt={cartItem.itemId.name}
                        />
                      </a>

                      <div className="flex items-center justify-between md:order-3 md:justify-end">
                        <div className="flex items-center">
                          <div className="flex items-center space-x-2">
                            <button
                              type="button"
                              onClick={() =>
                                handleRemoveFromCart(cartItem.itemId._id)
                              }
                              className="atom px-2 py-1 text-sm font-medium text-white bg-red-500 rounded hover:bg-red-600"
                            >
                              -
                            </button>
                            <p className="text-base font-bold text-gray-900">
                              {cartItem.quantity}
                            </p>
                            <button
                              type="button"
                              onClick={() =>
                                handleAddToCart(cartItem.itemId._id)
                              }
                              className="px-2 atom py-1 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div className="text-end md:order-4 md:w-32">
                          <p className="text-base font-bold text-gray-900">
                            ${cartItem.itemId.price.toFixed(2)}
                          </p>
                        </div>
                      </div>

                      <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                        <a
                           href={`/ItemsDetails/${cartItem.itemId?._id}`}
                          className="text-base font-medium text-gray-900 hover:underline"
                        >
                          {cartItem.itemId.name}
                        </a>
                        <p className="text-base font-normal text-gray-500">
                          {cartItem.itemId.description}
                        </p>

                        <div className="flex items-center gap-4">
                          <button
                            type="button"
                            className="inline-flex atom items-center text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline"
                         onClick={() => {
                            toggleViewModal();
                            setViewItemId(cartItem.itemId._id);
                         }}
                         >
                            View
                          </button>

                          <button
                            type="button"
                            className="inline-flex atom items-center text-sm font-medium text-red-600 hover:underline"
                            onClick={() =>
                              handleRemoveAllInstances(cartItem.itemId._id)
                            }
                          >
                            <svg
                              className="me-1.5 h-5 w-5"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18 17.94 6M18 18 6.06 6"
                              />
                            </svg>
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="hidden xl:mt-8 xl:block">
                <h3 className="text-2xl font-semibold text-gray-900">
                  People also bought
                </h3>
                <div className="flex overflow-x-auto space-x-4 py-4">
                  {items.map((item: Item) => (
                    <div
                      key={item._id}
                      className="flex-shrink-0 w-1/3 min-w-[200px]"
                    >
                      <ItemsCard item={item} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
              <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
                <p className="text-xl font-semibold text-gray-900">
                  Order summary
                </p>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal text-gray-500">
                        Original price
                      </dt>
                      <dd className="text-base font-medium text-gray-900">
                        ${cart.totalPrice.toFixed(2)}
                      </dd>
                    </dl>

                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal text-gray-500">
                        Savings
                      </dt>
                      <dd className="text-base font-medium text-green-600">
                        -${savings.toFixed(2)}
                      </dd>
                    </dl>

                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal text-gray-500">
                        Store Pickup
                      </dt>
                      <dd className="text-base font-medium text-gray-900">
                        ${storePickup.toFixed(2)}
                      </dd>
                    </dl>

                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal text-gray-500">
                        Tax
                      </dt>
                      <dd className="text-base font-medium text-gray-900">
                        ${tax.toFixed(2)}
                      </dd>
                    </dl>
                  </div>

                  <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2">
                    <dt className="text-base font-bold text-gray-900">Total</dt>
                    <dd className="text-base font-bold text-gray-900">
                      ${total.toFixed(2)}
                    </dd>
                  </dl>
                </div>

                <button
                  onClick={toggleCheckModal}
                  className="flex w-full atom items-center justify-center rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300"
                >
                  Proceed to Checkout
                </button>

                <div className="flex items-center justify-center gap-2">
                  <a
                    href="#"
                    title=""
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline"
                  >
                    Continue Shopping
                  </a>
                </div>
              </div>

              <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
                <form className="space-y-4">
                  <div>
                    <label
                      htmlFor="voucher"
                      className="mb-2 block text-sm font-medium text-gray-900"
                    >
                      Do you have a voucher or gift card?
                    </label>
                    <input
                      type="text"
                      id="voucher"
                      className="block w-full rounded-lg border bg-slate-50 border-gray-300 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500"
                      placeholder=""
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="flex w-full items-center atom justify-center rounded-lg bg-primary-700 bg-green-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300"
                    onClick={(e) => handlevoucher(e)}
                  >
                    Apply Code
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        <CheckoutModel isOpen={isModalOpen} toggleCheckModal={toggleCheckModal}>
          {" "}
        </CheckoutModel>
        <ViewModel
          isViewModalOpen={isViewModalOpen}
          toggleViewModal={toggleViewModal}
          itemId={viewItemId}></ViewModel>
      </section>)}
    </>
  );
};

export default CartPage;
