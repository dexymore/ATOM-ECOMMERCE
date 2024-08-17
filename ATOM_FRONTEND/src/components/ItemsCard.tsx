import React, { useState } from 'react';
import { Link } from 'react-router-dom';

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

const ItemsCard: React.FC<{ item: Item }> = ({ item }) => {
    const { images } = item;
    const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
    const [prevMouseX, setPrevMouseX] = useState<number | null>(null);
    const [hovered, setHovered] = useState<boolean>(false);

    const handleMouseMove = (event: React.MouseEvent) => {
        if (prevMouseX !== null) {
            if (event.clientX > prevMouseX && currentImageIndex < images.length - 1) {
                setCurrentImageIndex((prevIndex) => Math.min(prevIndex + 1, images.length - 1));
            } else if (event.clientX < prevMouseX && currentImageIndex > 0) {
                setCurrentImageIndex((prevIndex) => Math.max(prevIndex - 1, 0));
            }
        }
        setPrevMouseX(event.clientX);
        setHovered(true);
    };

    const handleMouseLeave = () => {
        setPrevMouseX(null);
        setCurrentImageIndex(0);
        setHovered(false);
    };

    return (
        <Link
            to={`/ItemsDetails/${item._id}`}
            className="relative flex flex-col text-gray-700 bg-white shadow-sm bg-clip-border rounded-xl w-[300px] h-[450px]   hover:shadow-lg m-3"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <div className="relative overflow-hidden text-gray-700 bg-white bg-clip-border h-96">
                <img
                    src={images[currentImageIndex]?.url}
                    alt="card-image"
                    className={`object-cover w-[300px] h-[450px] transition-opacity duration-500 ease-in-out ${hovered ? 'opacity-100' : 'opacity-0'}`}
                />
                <img
                    src={images[0]?.url}
                    alt="card-image"
                    className={`absolute top-0 left-0 object-cover w-[300px] h-[450px] transition-opacity duration-500 ease-in-out ${hovered ? 'opacity-0' : 'opacity-100'}`}
                />
            </div>
            <div className="p-2">
                <div className="flex-col items-center justify-between">
                    <p className="block  text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                        {item.name}
                    </p>
                    <p className="block  text-base antialiased font-medium leading-relaxed text-gray-500">
                        ${item.price}
                    </p>
                </div>
            </div>
        </Link>
    );
};

export default ItemsCard;
