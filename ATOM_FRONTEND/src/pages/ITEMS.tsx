import React, { useEffect, useState } from "react";
import { getItems } from "../utils/API";
import ItemsCard from "../components/ItemsCard";
import classes from "./pages.module.css"; // Import CSS module
import CategoryFilter from "../components/categoryFilter";

interface Item {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

export const Items: React.FC = () => {
  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    const response = await getItems();
    if (response.status === "success") {
      const itemsData = response.data.items; // Assuming items are nested within a property named 'items' in the response
      setItems(itemsData);
    } else {
      console.error("Failed to fetch items:", response.error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
<section className="flex flex-col lg:flex-col">
<CategoryFilter/>

  <div className="flex flex-wrap justify-center px-4 lg:px-10 xl:px-20 gap-4 lg:gap-8">
    {items.map((item: Item) => (
      <div key={item.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/5 xl:w-1/5">
        <ItemsCard item={item} />
      </div>
    ))}
  </div>
</section>

  );
};
