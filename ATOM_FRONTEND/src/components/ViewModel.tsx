import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { getOneItem } from "../utils/API";

interface ViewModelProps {
  isViewModalOpen:boolean,
  toggleViewModal: () => void;
  itemId: string | undefined;
}
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

const ViewModel: React.FC<ViewModelProps> = ({
  isViewModalOpen,
  toggleViewModal,
  itemId,
}) => {
  const [item, setItem] = useState<Item>();

  useEffect(() => {
    if (isViewModalOpen) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }, [isViewModalOpen]);

  const handleOverlayClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.target === e.currentTarget) {
      toggleViewModal();
    }
  };

  useEffect(() => {
    if (itemId) {
      const fetchItem = async () => {
        try {
          const item = await getOneItem(itemId);
          setItem(item);
          console.log(item);
        } catch (error) {
          console.error("Failed to fetch item:", error);
        }
      };

      fetchItem();
    }
  }, [itemId]);

  return (
<div>
  <div
    id="view-modal"
    tabIndex={1}
    aria-hidden="true"
    className={`fixed inset-0 z-50 flex justify-center items-center ${
      isViewModalOpen ? "block" : "hidden"
    }`}
    onClick={handleOverlayClick}
  >
    <div className="relative w-full max-w-xs md:max-w-md lg:max-w-3xl xl:max-w-4xl max-h-[90vh] overflow-auto bg-white rounded-lg shadow">
      <div className="relative p-4 md:p-5">
        <div className="flex items-center justify-between border-b rounded-t">
          <h3 className="text-lg font-semibold text-gray-900">
            {item?.name}
          </h3>
          <button
            type="button"
            className="atom text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
            onClick={toggleViewModal}
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
        <div className="p-4 md:p-5">
          <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex overflow-x-auto space-x-4 py-4 w-full">
              {item?.images.slice(0, 4).map((image, index) => (
                <img
                  key={index}
                  src={image.url} // Use the `url` property from the image object
                  alt={item.name}
                  className="flex-shrink-0  w-[350px] max-h-[420px]"
                />
              ))}
            </div>
          
            <div className="col-span-1 md:mt-16 ">
            <div>
              <h3>
                Price: <span className="text-lg my-5 font-bold">${item?.price}</span>
              </h3>
            </div>
              <div className="block mb-2 text-sm my-5 font-medium text-gray-500">
                <p className="my-5">{item?.description}</p>
              </div>
              <div className="flex gap-4 flex-wrap">
                <div className="rounded-lg border border-gray-300 px-8 py-2 font-bold flex items-center hover:bg-gray-100 bg-white">
                  <p>{item?.category}</p>
                </div>
                <div className="rounded-lg border border-gray-300 px-8 py-2 font-bold flex items-center hover:bg-gray-100 bg-white">
                  <p>{item?.size}</p>
                </div>
                <div className="rounded-lg border border-gray-300 px-8 py-2 font-bold flex items-center hover:bg-gray-100 bg-white">
                  <p>{item?.sex}</p>
                </div>

               
              </div>
              <div className="mt-6">
                  <a
                    type="button"
                    className="inline-flex md:ml-2 items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline"
                  href={`/ItemsDetails/${item?._id}`}
                  >
                  view full details <span>&rarr;</span>
                  </a>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>


  );
};
export default ViewModel;
