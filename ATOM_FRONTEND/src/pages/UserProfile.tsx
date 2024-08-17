import React, { useEffect, useState } from "react";
import { getUserOrders } from "../utils/API";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getCurrentUser } from "../utils/API";

import {
  faCheck,
  faTruckFast,
  faPhone,
  faLocationDot,
  faDollarSign,
  faCircleNotch
} from "@fortawesome/free-solid-svg-icons";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import ViewModel from "../components/ViewModel";
const UserProfile: React.FC = () => {
  const [userOrders, setUserOrders] = useState<any[]>([]);
  const [user, setUser] = useState<any>({});
  const [viewItemId, setViewItemId] = useState<string | undefined>();
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const toggleViewModal = () => setIsViewModalOpen(!isViewModalOpen);
const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const orders = await getUserOrders();
        setUserOrders(orders);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
      finally {
        setLoading(false);
      }
    };


    fetchOrders();
  }, []);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const user = await getCurrentUser();
        console.log(user);  
        setUser(user);
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      }
    };
    fetchUserInfo();
  }, []);

  const downloadInvoice = async (order: any) => {
    const element = document.getElementById(`invoice-${order._id}`);
    const buttonElement = document.querySelector(`#invoice-${order._id} #download-button`);
  
    if (!element) {
      console.error("Element not found");
      return;
    }
  

  
    try {

      if (buttonElement) {
        buttonElement.style.display = "none";
      }
  
      const canvas = await html2canvas(element);
      const imgData = canvas.toDataURL("image/png");
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const pdf = new jsPDF({
        orientation: imgWidth > imgHeight ? "landscape" : "portrait",
        unit: "px",
        format: [imgWidth, imgHeight],
      });
  
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save(`invoice-${order._id}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {

      if (buttonElement) {
        buttonElement.style.display = "block";
      }
    }
  };
  
  

  return (
<>
{
  loading ? (
    <div className="flex items-center justify-center w-full h-[600px]">
    <FontAwesomeIcon
      icon={faCircleNotch}
      className="text-black h-12 w-12 animate-spin"
    />
  </div>
  )
  :(<div className="flex flex-col mt-20 items-center max-w-full mx-auto">



      
 <ul className="flex flex-col items-center min-h-screen space-y-4">
          <li
            className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm w-[85%]"> 
    <div className="b-w-full bg-white border border-gray-200 p-6 rounded-lg shadow hover:bg-gray-100">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
        welcome <span
        className="text-green-500 atom"
        >{user?.name}</span> happy shopping  
      </h5>
      <p className="font-normal text-gray-700">
        This is your profile page. You can see your orders here.
      </p>
    </div>
  </li>
        {userOrders.map((order: any) => (
          <li
            key={order._id}
            id={`invoice-${order._id}`}
            className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm w-[85%]"
          >
            <div className="rounded-md border border-black p-4">
              <div className="flex  gap-0 justify-between flex-wrap">
                <div className=" rounded-lg border border-gray-300 px-8 py-2 font-bold flex items-center hover:bg-gray-100 bg-white shadow-3xl">
                  <div className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-300 text-slate-700 mr-2">
                    <FontAwesomeIcon icon={faDollarSign} />
                  </div>
                  ${order.price.toFixed(2)}
                </div>
                <div className="rounded-lg border border-gray-300 px-8 py-2 font-bold flex items-center hover:bg-gray-100 bg-white">
                  <div className="w-6 h-6 flex items-center justify-center rounded-full bg-green-500 text-white mr-2">
                    <FontAwesomeIcon icon={faCheck} />
                  </div>
                  <span>{order.paid ? "Paid" : "No"}</span>
                </div>
                <div className="rounded-lg border border-gray-300 px-8 py-2 font-bold flex items-center hover:bg-gray-100 bg-white shadow-3xl">
                  <div className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-300 text-slate-700 mr-2">
                    <FontAwesomeIcon icon={faTruckFast} />
                  </div>
                  {order.delivered ? "Yes" : "Waiting to ship"}
                </div>
                <div className="rounded-lg border border-gray-300 px-8 py-2 font-bold flex items-center hover:bg-gray-100 bg-white shadow-3xl">
                  <div className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-300 text-slate-700 mr-2">
                    <FontAwesomeIcon icon={faPhone} />
                  </div>
                  {order.phone_number}
                </div>
                <div className="rounded-lg border border-gray-300 px-8 py-2 font-bold flex items-center hover:bg-gray-100 bg-white shadow-3xl">
                  <div className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-300 text-slate-700 mr-2">
                    <FontAwesomeIcon icon={faLocationDot} />
                  </div>
                  {order.address}
                </div>
                <div className="rounded-lg border border-gray-300 px-8 py-2 font-bold flex items-center hover:bg-gray-100 bg-white shadow-3xl">
                  {order.delivery}
                </div>
              </div>

              <div className="mt-2">
                <div className="block max-w-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                    Special Note
                  </h5>
                  <p className="font-normal text-gray-700">
                    {order.special_note}
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <strong>Items:</strong>
                <div className="space-y-4">
                  {order.cartItems.map((item: any) => (
                    <div
                      key={item._id}
                      className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm w-full max-w-[100%]"
                    >
                      <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                        <div className="shrink-0 md:order-1">
                          <img
                            className="h-20 w-20"
                            src={item.itemId.images[0].url}
                            alt={item.itemId.name}
                          />
                          <img
                            className="hidden h-40 w-30"
                            src={item.itemId.images[0].url}
                            alt={item.itemId.name}
                          />
                        </div>
                        

                        <div className="flex items-center justify-between md:order-3 md:justify-end">
                          <div className="text-end md:order-4">
                            <p className="text-base font-bold text-gray-900">
                              ${item.price.toFixed(2)}
                            </p>
                          </div>
                        </div>

                        <div className="w-full min-w-0 flex-1 space-y-4 md:order-2">
                          <p className="text-base font-medium text-gray-900">
                            {item.itemId.name}
                          </p>
                          <p className="text-base font-normal text-gray-500">
                            {item.itemId.description}
                          </p>
                       

                          <div className="flex items-center gap-4">
                            <p className="text-base font-normal text-gray-500">
                              <strong>Quantity:</strong> {item.quantity}
                            </p>
                          </div>

                          <div className="flex items-center gap-4">
                          <button
                            type="button"
                            className="inline-flex atom items-center text-sm font-medium text-gray-800 hover:text-gray-900 hover:underline"
                         onClick={() => {
                            toggleViewModal();
                            setViewItemId(item.itemId._id);
                         }}
                         >
                            View
                          </button>

                     
                        </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <button
              className="mt-4 atom bg-green-600 text-white px-4 py-2 rounded hover:bg-green-800"
              id="download-button"
              onClick={() => downloadInvoice(order)}
            >
              Download Invoice
            </button>
          </li>
        ))}
      </ul>
    <ViewModel  
      itemId={viewItemId}
      isViewModalOpen={isViewModalOpen}
      toggleViewModal={toggleViewModal}></ViewModel>
    </div>
)}</>);
};

export default UserProfile;
