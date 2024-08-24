import React, { useEffect } from "react";
import { useParams } from "react-router";
import { getOneItem } from "../utils/API";
import { useState, useRef } from "react";

import { useSelector } from "react-redux";
import { addToCart, filterItems } from "../utils/API";
import { RootState } from "../store";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch, faShareNodes } from "@fortawesome/free-solid-svg-icons";
import ItemsCard from "../components/ItemsCard";

import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

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
  category: string;
  sex: string;
  size: string;
  stock: number;

  images: Image[];
}

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const auth = useSelector((state: RootState) => state.auth);
  const [product, setProduct] = useState<Item | undefined>(undefined);
  const [mainImage, setMainImage] = useState<string>(
    product?.images[0]?.url || ""
  );
  const [loading, setLoading] = useState<boolean>(true);

  const [cartLoading, setCartLoading] = useState<boolean>(false);

  const [lensStyle, setLensStyle] = useState<React.CSSProperties>({});
  const containerRef = useRef<HTMLDivElement>(null);
  const [similarProducts, setSimilarProducts] = useState<Item[]>([]);
  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const { left, top, width, height } =
        containerRef.current.getBoundingClientRect();
      const x = e.clientX - left;
      const y = e.clientY - top;
      const lensSize = 100;
      const backgroundX = (x / width) * 100;
      const backgroundY = (y / height) * 100;

      setLensStyle({
        left: `${x - lensSize / 2}px`,
        top: `${y - lensSize / 2}px`,
        backgroundPosition: `${backgroundX}% ${backgroundY}%`,
        backgroundImage: `url(${mainImage})`,
        backgroundSize: `${width * 1.5}px ${height * 1.5}px`,
      });
    }
  };
  useEffect(() => {
    const fetchItemDetails = async () => {
      setLoading(true);
      try {
        const itemDetails = await getOneItem(id);
        setProduct(itemDetails);
        const similarItems = await filterItems("", itemDetails.sex, "", "");
        const filteredItems = similarItems.filter(
          (item: Item) => item._id !== id
        );
        setSimilarProducts(filteredItems);

        setMainImage(itemDetails.images[0]?.url || "");
      } catch (error) {
        toast.error("Failed to fetch items");
      } finally {
        setLoading(false);
      }
    };

    setLoading(true);

    if (id) {
      fetchItemDetails();
    } else {
      setLoading(false);
    }
  }, [id]);
  const navigate = useNavigate();

  const getBaseUrl = () => {
    return `${window.location.protocol}//${window.location.host}`;
  };

  const copyToClipboard = async (itemId: string) => {
    const baseUrl = getBaseUrl();
    const itemLink = `${baseUrl}/ItemsDetails/${itemId}`;

    try {
      await navigator.clipboard.writeText(itemLink);
      toast.success("Link copied to clipboard!", {
        id: "clipboard-toast", // Unique ID for this toast
        position: "top-center",
        style: {
          border: "1px solid #48BB98",
          backgroundColor: "#FFFFFF",
          color: "black",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
          fontSize: "16px",
          padding: "16px 24px",
          whiteSpace: "nowrap",
        },
        duration: 3000, // Duration in milliseconds
      });
    } catch (err) {
      console.error("Failed to copy item link: ", err);
      toast.error("Failed to copy link!", {
        id: "clipboard-toast-error", // Unique ID for error toast

        style: {
          border: "1px solid #E53E3E",
          backgroundColor: "#FFFFFF",
          color: "black",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
          fontSize: "16px",
          padding: "16px 24px",
          whiteSpace: "nowrap",
        },
        duration: 3000, // Duration in milliseconds
      });
    }
  };

  const addItemtoCart = async (itemId: string) => {
    setCartLoading(true);


    try {
      await addToCart(itemId);

      // Show success toast
      toast.success("Added to cart");

      // Delay navigation to allow the toast to be visible
      setTimeout(() => {
        navigate("/cart");
      }, 1000); // Adjust the delay as needed
    } catch (error) {
      toast.error("Failed to add to cart", { id: "add-to-cart-error" });
      if (!auth.loggedIn) {
        toast.error("Please login to add items to cart", {
          id: "add-to-cart-error",
          position: "top-center",
        });
        navigate("/auth");
      }
      toast.error("Failed to add to cart");
    } finally {
      setCartLoading(false);
    }
  };

  return (
    <>
      {/* <Toaster 
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
/> */}

      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <nav className="flex">
            {/* modify if you want to add a path do not forget */}
            {/* <ol role="list" className="flex items-center">
              <li className="text-left">
                <div className="-m-1">
                  <a href="#" className="rounded-md p-1 text-sm font-medium text-gray-600 focus:text-gray-900 focus:shadow hover:text-gray-800"> Home </a>
                </div>
              </li>
      
              <li className="text-left">
                <div className="flex items-center">
                  <span className="mx-2 text-gray-400">/</span>
                  <div className="-m-1">
                    <a href="#" className="rounded-md p-1 text-sm font-medium text-gray-600 focus:text-gray-900 focus:shadow hover:text-gray-800"> Products </a>
                  </div>
                </div>
              </li>
      
              <li className="text-left">
                <div className="flex items-center">
                  <span className="mx-2 text-gray-400">/</span>
                  <div className="-m-1">
                    <a href="#" className="rounded-md p-1 text-sm font-medium text-gray-600 focus:text-gray-900 focus:shadow hover:text-gray-800" aria-current="page"> Coffee </a>
                  </div>
                </div>
              </li>
            </ol> */}
          </nav>

          {loading ? (
            <div className="flex items-center justify-center w-full h-[600px]">
              <FontAwesomeIcon
                icon={faCircleNotch}
                className="text-black h-12 w-12 animate-spin"
              />
            </div>
          ) : (
            <div className="lg:col-gap-12 xl:col-gap-16 mt-8 grid grid-cols-1 gap-12 lg:mt-12 lg:grid-cols-5 lg:gap-16">
              <div className="lg:col-span-3 lg:row-end-1">
                <div className="lg:flex lg:items-start">
                  <div className="lg:order-2 lg:ml-5">
                    <div
                      className="max-w-xl overflow-hidden rounded-lg magnify-container"
                      onMouseMove={handleMouseMove}
                      ref={containerRef}
                    >
                      <img
                        className="w-[700px] h-[850px] object-cover magnify-image"
                        src={mainImage}
                        alt="Main Image"
                      />
                      <div className="magnify-lens" style={lensStyle}></div>
                    </div>
                  </div>

                  <div className="mt-2 w-full lg:order-1 lg:w-32 lg:flex-shrink-0">
                    <div className="flex flex-row items-start lg:flex-col">
                      {product?.images.slice(0, 5).map((image, index) => (
                        <button
                          key={index}
                          type="button"
                          className="flex-0 atom aspect-square mb-3 h-20 overflow-hidden rounded-lg border-2 border-gray-900 text-center"
                          onClick={() => setMainImage(image.url)}
                        >
                          <img
                            className="h-full w-full object-cover"
                            src={image.url}
                            alt={`Image ${index + 1}`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2 lg:row-span-2 lg:row-end-2">
                <h1 className="sm: text-2xl font-bold text-gray-900 sm:text-3xl">
                  {product?.name}
                </h1>

                {/* <div className="mt-5 flex items-center">
                <div className="flex items-center">
                  <svg className="block h-4 w-4 align-middle text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" className=""></path>
                  </svg>
                  <svg className="block h-4 w-4 align-middle text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" className=""></path>
                  </svg>
                  <svg className="block h-4 w-4 align-middle text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" className=""></path>
                  </svg>
                  <svg className="block h-4 w-4 align-middle text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" className=""></path>
                  </svg>
                  <svg className="block h-4 w-4 align-middle text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" className=""></path>
                  </svg>
                </div>
                <p className="ml-2 text-sm font-medium text-gray-500">1,209 Reviews</p>
              </div> */}

                <h2 className="mt-8 text-base text-gray-900">Description:</h2>
                <div className="mt-3 flex select-none flex-wrap items-center gap-1">
                  {product?.description}
                </div>

                <h2 className="mt-8 text-base text-gray-900">utils</h2>
                <div className="mt-3 flex select-none flex-wrap items-center gap-1">
                  <div>
                    <div className="peer-checked:bg-black peer-checked:text-white rounded-lg border border-black px-6 py-2 font-bold">
                      {" "}
                      {product?.category}
                    </div>
                  </div>
                  <div>
                    <div className="peer-checked:bg-black peer-checked:text-white rounded-lg border border-black px-6 py-2 font-bold">
                      {product?.sex}
                    </div>
                  </div>
                  <div>
                    <div className="peer-checked:bg-black peer-checked:text-white rounded-lg border border-black px-6 py-2 font-bold">
                      {product?.size}
                    </div>
                  </div>
                </div>

                <div className="mt-10 flex flex-col items-center justify-between space-y-4 border-t border-b py-4 sm:flex-row sm:space-y-0">
                  <div className="flex items-end">
                    <h1 className="text-3xl font-bold">${product?.price}</h1>
                  </div>

                  <div className="flex space-x-0 gap-8">
                    <button
                      type="button"
                      onClick={() => addItemtoCart(product._id)}
                      disabled={cartLoading}
                      className="inline-flex items-center justify-center  rounded-md border-2 border-transparent bg-gray-900 bg-none px-[42px] py-3 text-center text-base font-bold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800"
                    >
                      {cartLoading ? (
                        <div className=" px-[39.5px]">
                          <FontAwesomeIcon
                            icon={faCircleNotch}
                            className="mr-2 h-5 w-5 animate-spin"
                          />
                        </div>
                      ) : (
                        <>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                            />
                          </svg>
                          <span className="atom mt-2 ml-1">Add to Cart</span>{" "}
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => copyToClipboard(product._id)}
                      className="flex items-center justify-center w-16 h-16 rounded-full bg-white border-2 border-gray-300 text-gray-500 cursor-pointer hover:border-slate-900 hover:text-slate-900"
                    >
                      <FontAwesomeIcon
                        icon={faShareNodes}
                        className="h-6 w-6"
                      />
                    </button>
                  </div>
                </div>

                <ul className="mt-8 space-y-2">
                  <li className="flex items-center text-left text-sm font-medium text-gray-600">
                    <svg
                      className="mr-2 block h-5 w-5 align-middle text-gray-500"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        className=""
                      ></path>
                    </svg>
                    Free shipping worldwide
                  </li>

                  <li className="flex items-center text-left text-sm font-medium text-gray-600">
                    <svg
                      className="mr-2 block h-5 w-5 align-middle text-gray-500"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                        className=""
                      ></path>
                    </svg>
                    Cancel Anytime
                  </li>
                </ul>
              </div>

              <div className="lg:col-span-3">
                <div className="border-b border-gray-300">
                  <nav className="flex gap-4">
                    <a
                      href="#"
                      title=""
                      className="border-b-2 border-gray-900 py-4 text-sm font-medium text-gray-900 hover:border-gray-400 hover:text-gray-800"
                    >
                      {" "}
                      Description{" "}
                    </a>

                    <p className="inline-flex items-center border-b-2 border-transparent py-4 text-sm font-medium text-gray-600">
                      stock
                      <span className="ml-2 block rounded-full bg-gray-500 px-2 py-px text-xs font-bold text-gray-100">
                        {" "}
                        {product?.stock}
                      </span>
                    </p>
                  </nav>
                </div>

                <div className="mt-8 w-full sm:mt-12">
                  <h1 className="text-3xl font-bold">Delivered To Your Door</h1>
                  <p className="mt-4">
                    from atom to your doorstep, we deliver your items in the best condition
                  </p>
                  <h1 className="mt-8 text-3xl font-bold">
                   you may also like
                  </h1>
                  <div className="flex w-[100%] overflow-x-auto space-x-0.5 sm:space-x-4 py-4 px-1">
                    {similarProducts.map((item: Item) => (
                      <div
                        key={item._id}
                        className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 min-w-[150px] sm:min-w-[200px]"
                      >
                        <ItemsCard item={item} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default ProductDetails;
