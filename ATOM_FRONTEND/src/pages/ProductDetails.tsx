import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { getOneItem } from '../utils/API';
import { useState,useRef } from 'react';
import { useToaster } from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../utils/API';

import { fetchCart } from '../store/cartThunks';

import { cartActions } from '../store/cart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

import toast, { Toaster } from 'react-hot-toast';


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
  category:string;
  sex:string;
  size:string;
  stock:number
  
  images: Image[];
}

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
const dispatch = useDispatch();


  

   const [product, setProduct] = useState<Item|undefined >(undefined);
   const [mainImage, setMainImage] = useState<string>(product?.images[0]?.url || '');
   const [loading, setLoading] = useState<boolean>(true);
   const [error, setError] = useState<string | null>(null);
   const [cartLoading, setCartLoading] = useState<boolean>(false);
   const [cartError, setCartError] = useState<string | null>(null);
   const [lensStyle, setLensStyle] = useState<React.CSSProperties>({});
   const containerRef = useRef<HTMLDivElement>(null);

   const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
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
      try {
        const itemDetails = await getOneItem(id);
        setProduct(itemDetails);
        setMainImage(itemDetails.images[0]?.url||"")
        console.log(itemDetails);
      } catch (error) {
        setError("Failed to fetch items");
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
  
  const addItemtoCart =async (itemId:string) => {
    setCartLoading(true);
    
    setCartError(null);
    try{
      const response =await addToCart(itemId);
   
          toast.success("Added to cart");

    }
    catch(error){
      setCartError("Failed to add to cart");
    }
    finally{
      setCartLoading(false);
    }
  
  

  }
    return (<>
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
               backgroundColor: '##48BB78', 
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
      
          <div className="lg:col-gap-12 xl:col-gap-16 mt-8 grid grid-cols-1 gap-12 lg:mt-12 lg:grid-cols-5 lg:gap-16">
            <div className="lg:col-span-3 lg:row-end-1">
              <div className="lg:flex lg:items-start">
                <div className="lg:order-2 lg:ml-5">
                <div
        className="max-w-xl overflow-hidden rounded-lg magnify-container"
        onMouseMove={handleMouseMove}
        ref={containerRef}
      >
        <img className="w-full h-auto object-cover magnify-image" src={mainImage} alt="Main Image" />
        <div className="magnify-lens" style={lensStyle}></div>
      </div>
                </div>
      
                <div className="mt-2 w-full lg:order-1 lg:w-32 lg:flex-shrink-0">
      <div className="flex flex-row items-start lg:flex-col">
        {product?.images.slice(0, 4).map((image, index)  => (
          
          <button
            key={index}
            type="button"
            className="flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-2 border-gray-900 text-center"
            onClick={() => setMainImage(image.url)}
          >
            <img className="h-full w-full object-cover" src={image.url} alt={`Image ${index + 1}`} />
          
          </button>
        ))}
      </div>
    </div>
              </div>
            </div>
      
            <div className="lg:col-span-2 lg:row-span-2 lg:row-end-2">
              <h1 className="sm: text-2xl font-bold text-gray-900 sm:text-3xl">{product?.name}</h1>
      
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
    <div className="peer-checked:bg-black peer-checked:text-white rounded-lg border border-black px-6 py-2 font-bold">  {product?.category}</div>

  </div>
  <div>
    <div className="peer-checked:bg-black peer-checked:text-white rounded-lg border border-black px-6 py-2 font-bold">{product?.sex}</div>

  </div>
  <div>
    <div className="peer-checked:bg-black peer-checked:text-white rounded-lg border border-black px-6 py-2 font-bold">{product?.size}</div>

  </div>
</div>

      
              <div className="mt-10 flex flex-col items-center justify-between space-y-4 border-t border-b py-4 sm:flex-row sm:space-y-0">
                <div className="flex items-end">
                  <h1 className="text-3xl font-bold">${product?.price}</h1>
                 
                </div>
      
                <button
                type="button"
                onClick={() => addItemtoCart(product._id)}
                disabled={cartLoading}
                className="inline-flex items-center justify-center rounded-md border-2 border-transparent bg-gray-900 bg-none px-12 py-3 text-center text-base font-bold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800"
            >
            {cartLoading ? (
          <FontAwesomeIcon
            icon={faCircleNotch}
            className="mr-2 h-5 w-5 animate-spin"
          />
        ) : (
          <><svg
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
        <span>Add to Cart</span> </>)}
       
            </button>
              </div>
      
              <ul className="mt-8 space-y-2">
                <li className="flex items-center text-left text-sm font-medium text-gray-600">
                  <svg className="mr-2 block h-5 w-5 align-middle text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" className=""></path>
                  </svg>
                  Free shipping worldwide
                </li>
      
                <li className="flex items-center text-left text-sm font-medium text-gray-600">
                  <svg className="mr-2 block h-5 w-5 align-middle text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" className=""></path>
                  </svg>
                  Cancel Anytime
                </li>
              </ul>
            </div>
      
            <div className="lg:col-span-3">
              <div className="border-b border-gray-300">
                <nav className="flex gap-4">
                  <a href="#" title="" className="border-b-2 border-gray-900 py-4 text-sm font-medium text-gray-900 hover:border-gray-400 hover:text-gray-800"> Description </a>
      
                  <p  className="inline-flex items-center border-b-2 border-transparent py-4 text-sm font-medium text-gray-600">
                    stock
                    <span className="ml-2 block rounded-full bg-gray-500 px-2 py-px text-xs font-bold text-gray-100"> {product?.stock}</span>
                  </p>
                </nav>
              </div>
      
              <div className="mt-8 flow-root sm:mt-12">
                <h1 className="text-3xl font-bold">Delivered To Your Door</h1>
                <p className="mt-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia accusantium nesciunt fuga.</p>
                <h1 className="mt-8 text-3xl font-bold">From Our Factories</h1>
                <p className="mt-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio numquam enim facere.</p>
                <p className="mt-4">Amet consectetur adipisicing elit. Optio numquam enim facere. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolore rerum nostrum eius facere, ad neque.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
</>
    );
};

export default ProductDetails;