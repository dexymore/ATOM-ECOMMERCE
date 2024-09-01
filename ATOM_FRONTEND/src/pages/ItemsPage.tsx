import React, { useEffect, useState, } from "react";
import { filterItems } from "../utils/API";
import ItemsCard from "../components/ItemsCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronUp,
  faCircleNotch,
} from "@fortawesome/free-solid-svg-icons";
import { useSearchParams } from "react-router-dom";
import { useNavigate} from "react-router-dom";

interface Item {
  _id: string;
  name: string;
  description: string;
  price: number;
  images: Image[];
}

interface Image {
  public_id: string;
  url: string;
  _id: string;
}

export const Items: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  // const [index, setIndex] = useState<number>(0);
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState<string>(searchParams.get("name") || "");
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [category, setCategory] = useState<string |null>(
    searchParams.get("category") || ""
  );
  const [sex, setSex] = useState<string>(searchParams.get("sex") || "");
  const [size, setSize] = useState<string>(searchParams.get("size") || "");

  const [itemCount, setItemCount] = useState<number>(0);

  const categories = [
    "Bags",
    "Shoes",
    "Accessories",
    "Jeans",
    "T-Shirts",
    "Socks",
    "Dresses",
    "Jackets",
  ];

  const sexCategories = ["Male", "Female", "Unisex"];

  const sizeCategories = [
    { label: "Large", value: "L" },
    { label: "Medium", value: "M" },
    { label: "One Size", value: "One Size" },
  ];

  const updateQueryParams = (newParams: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.keys(newParams).forEach((key) => {
      if (newParams[key]) {
        params.set(key, newParams[key]);
      } else {
        params.delete(key);
      }
    });

    setSearchParams(params);
  };

  const handleCategoryClick = (category: string) => {
    setCategory(category);
    updateQueryParams({
      ...Object.fromEntries(searchParams.entries()),
      category,
    });
    setShowFilters(false);
  };

  const handleSexClick = (sex: string) => {
    setSex(sex);
    updateQueryParams({
      ...Object.fromEntries(searchParams.entries()),
      sex,
    });
    setShowFilters(false);
  };

  const handleSizeClick = (size: string) => {
    setSize(size);

    updateQueryParams({
      ...Object.fromEntries(searchParams.entries()),
      size,
    });
    setShowFilters(false);
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    updateQueryParams({
      ...Object.fromEntries(searchParams.entries()),
      name: e.target.value,
    });
  };

  const handleSearchSubmit = async () => {
    setLoading(true);
    try {
      const response = await filterItems(category, sex, size, search);

      if (response.status === "fail") {
        setError(response.message);
        setItems([]);
      } else {
        setError(null);
        setItems(response);
        setItemCount(response.length > 8 ? 8 : response.length);
      }
    } catch (error) {
      setError("Failed to fetch items");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleSearchSubmit = async () => {
      setLoading(true);
      try {
        const response = await filterItems(
          searchParams.get("category" || ""),
          searchParams.get("sex" || ""),
          searchParams.get("size" || ""),
          searchParams.get("name" || "")
        );

        if (response.length===0 ) {
          setError("No items found");
          setItems([]);
        } else {
          setError(null);
          setItems(response);
          setItemCount(response.length > 8 ? 8 : response.length);
        }
      } catch (error) {
        setError("No items found");
      } finally {
        setLoading(false);
      }
    };
    handleSearchSubmit();
  }, [searchParams, category, size, sex, search]);
  const handleLoadMore = () => {
    setItemCount((prev) => Math.min(prev + 8, items.length));
  };

  return (
    <>
      <section className="flex flex-col lg:flex-col w-[100%] items-center">
        <div className="flex flex-wrap justify-center w-full py-7">
          <div className="flex-1 mt-8">
            <div className="mx-4 my-4 md:mx-16 md:my-8 lg:mx-32">
              <div className="flex flex-col">
                <div className="px-4 md:px-6 border-b border-gray-400 bg-transparent">
                  <form
                    className="bg-transparent"
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSearchSubmit();
                    }}
                  >
                    <div className="relative mb-6 w-full shadow-xl flex items-center">
                      <input
                        type="text"
                        name="search"
                        className="h-12 w-full cursor-text rounded-md border border-gray-100 bg-transparent py-4 pr-12 pl-12 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        placeholder="Search by name"
                        value={search}
                        onChange={handleSearchInputChange}
                      />
                      <button
                        type="submit"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 flex items-center justify-center text-gray-400 hover:text-gray-600 focus:outline-none"
                      >
                        <svg
                          className="h-5 w-5"
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
                          <circle cx="11" cy="11" r="8"></circle>
                          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                      </button>
                    </div>
                  </form>
                  <div className={`gap-0 ${showFilters ? "flex" : "hidden"}`}>
                    <div className="w-full flex md:flex-row flex-col">
                      <div className="flex-1">
                        <h1 className="self-center underline text-xl font-semibold whitespace-nowrap">
                          Category
                        </h1>
                        <ul className="mt-4 space-y-2">
                          <li>
                            <button
                              className="text-gray-500 cursor-pointer py-2 px-4 rounded-md font-semibold hover:text-indigo-500 focus:text-indigo-500"
                              onClick={() => handleCategoryClick("")}
                            >
                              All
                            </button>
                          </li>
                          {categories.map((cat, index) => (
                            <li
                              key={index}
                              className={`text-gray-500 cursor-pointer py-2 px-4 rounded-md font-semibold hover:text-indigo-500 focus:text-indigo-500`}
                              onClick={() => handleCategoryClick(cat)}
                            >
                              {cat}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex-1">
                        <h1 className="self-center underline text-xl font-semibold whitespace-nowrap">
                          Sex
                        </h1>
                        <ul className="mt-4 space-y-2">
                          <li>
                            <button
                              className="text-gray-500 cursor-pointer py-2 px-4 rounded-md font-semibold hover:text-indigo-500 focus:text-indigo-500"
                              onClick={() => handleSexClick("")}
                            >
                              All
                            </button>
                          </li>

                          {sexCategories.map((sexCategory, index) => (
                            <li
                              key={index}
                              className={`text-gray-500 cursor-pointer py-2 px-4 rounded-md font-semibold hover:text-indigo-500 focus:text-indigo-500`}
                              onClick={() => handleSexClick(sexCategory)}
                            >
                              {sexCategory}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex-1">
                        <h1 className="self-center underline text-xl font-semibold whitespace-nowrap">
                          Size
                        </h1>
                        <ul className="mt-4 space-y-2">
                          <li>
                            <button
                              className="text-gray-500 cursor-pointer py-2 px-4 rounded-md font-semibold hover:text-indigo-500 focus:text-indigo-500"
                              onClick={() => handleSizeClick("")}
                            >
                              All
                            </button>
                          </li>

                          {sizeCategories.map((sizeCategory, index) => (
                            <li
                              key={index}
                              className={`text-gray-500 cursor-pointer py-2 px-4 rounded-md font-semibold hover:text-indigo-500 focus:text-indigo-500`}
                              onClick={() =>
                                handleSizeClick(sizeCategory.value)
                              }
                            >
                              {sizeCategory.label}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center mb-2 mt-[-18px]">
                    <button
                      className="px-4 py-2 rounded-md text-slate-800 flex flex-col items-center"
                      onClick={() => setShowFilters(!showFilters)}
                    >
                      filter items
                      <span
                        className={`mt-1 transition-transform duration-300 ${
                          showFilters ? "animate-up" : "animate-down"
                        }`}
                      >
                        <FontAwesomeIcon
                          icon={showFilters ? faChevronUp : faChevronDown}
                        />
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="flex items-center justify-center w-full h-[600px]">
            <p className="text-black text-3xl">{error}</p>
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center w-full h-[600px]">
            <FontAwesomeIcon
              icon={faCircleNotch}
              className="text-black h-12 w-12 animate-spin"
            />
          </div>
        ) : (
          <>
            {" "}
            <div className="flex-wrap md:px-12 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {items.slice(0, itemCount).map((item: Item) => (
                <div
                  key={item._id}
                  className="col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-1"
                >
                  <ItemsCard item={item} />
                </div>
              ))}
            </div>
            <div className="mt-6 mb-6">
              {items.length !== itemCount && (
                <button
                  className="bg-slate-900 atom hover:bg-black text-white font-bold py-2 px-4 rounded-full"
                  onClick={handleLoadMore}
                >
                  {" "}
                  load more{" "}
                </button>
              )}
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default Items;
