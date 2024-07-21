import React, { useEffect, useState } from "react";
import { getItems } from "../utils/API";
import ItemsCard from "../components/ItemsCard";
import classes from "./pages.module.css"; // Import CSS module
import CategoryFilter from "../components/categoryFilter";
import NavBar from "../components/NavBar";
import Banner from "../components/Banner";


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
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const items = await getItems();
        setItems(items);
        console.log(items); 
      } catch (error) {
        setError("Failed to fetch items");
    
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);
  return (<>
    <Banner />
     <section className="flex flex-col lg:flex-col w-[100%] items-center">
  <div className="md:flex hidden flex-wrap justify-center w-full py-7  ">
    <CategoryFilter />
  </div>
  <div className=" flex-wrap px-12  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
  {items.map((item: Item) => (
    <div key={item._id} className="col-span-1">
      <ItemsCard item={item} />
    </div>
  ))}
</div>

</section>
</>
  );
};
