import React from 'react';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';




const CategoryFilter: React.FC = () => {
  const [advancedSearch, setAdvancedSearch] = useState<boolean>(false);

    return (
<div className="flex-1 ">
  <div className="mx-32 my-8">
    <div className="flex flex-col">
      <div className=" px-6  border-b border-gray-400  bg-transparent">
        <form className="bg-transparent">
          <div className="relative mb-10 w-full flex items-center justify-between rounded-md">
            <svg
              className="absolute left-2 block h-5 w-5 text-gray-400 "
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" className=""></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65" className=""></line>
            </svg>
            <input
              type="name"
              name="search"
              className="h-12 w-full cursor-text rounded-md border border-gray-100 bg-transparent py-4 pr-40 pl-12 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              placeholder="Search by name, type, manufacturer, etc"
            />
          </div>

          <div className={` grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${advancedSearch?"grid":"hidden"}`}>
            <div className="flex flex-col bg-transparent">
              <label htmlFor="name" className="text-sm font-medium text-stone-600">
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Raspberry juice"
                className="mt-2 block w-full rounded-md border border-gray-100 bg-transparent px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
            </div>

            <div className="flex flex-col bg-transparent">
              <label htmlFor="manufacturer" className="text-sm font-medium text-stone-600">
                Manufacturer
              </label>
              <select
                id="manufacturer"
                className="mt-2 block w-full rounded-md border border-gray-100 bg-transparent px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              >
                <option>Cadberry</option>
                <option>Starbucks</option>
                <option>Hilti</option>
              </select>
            </div>

            <div className="flex flex-col bg-transparent">
              <label htmlFor="date" className="text-sm font-medium text-stone-600">
                Date of Entry
              </label>
              <input
                type="date"
                id="date"
                className="mt-2 block w-full cursor-pointer rounded-md border border-gray-100 bg-transparent px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
            </div>

            <div className="flex flex-col bg-transparent">
              <label className="text-sm font-medium text-stone-600">Status</label>
              <select
                id="status"
                className="mt-2 block w-full cursor-pointer rounded-md border border-gray-100 bg-transparent px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              >
                <option>Dispatched Out</option>
                <option>In Warehouse</option>
                <option>Being Brought In</option>
              </select>
            </div>
          </div>

          <div className="mt-6 grid w-full grid-cols-2 justify-end space-x-4 md:flex mb-6">
           <p className="text-black-600  border-collapse px-4 py-2 cursor-pointer" onClick={() => setAdvancedSearch(!advancedSearch)}>Advanced Search <span>
          <FontAwesomeIcon icon={advancedSearch?faChevronUp:faChevronDown} /></span></p>
            <button className={`atom rounded-lg bg-blue-600 px-8 py-2 font-medium text-white outline-none hover:opacity-80 focus:ring ${advancedSearch?"grid":"hidden"}` }>Search</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>

    );
};

export default CategoryFilter;