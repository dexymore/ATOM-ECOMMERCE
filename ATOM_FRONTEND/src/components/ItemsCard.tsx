import React, { useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import toast from "react-hot-toast";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareNodes } from '@fortawesome/free-solid-svg-icons'; 

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
    const [hovered, setHovered] = useState<boolean>(false);
    const lastMoveTime = useRef<number>(0);
    const lastMoveDirection = useRef<'left' | 'right' | null>(null);
    const transitionDelay = 500; // 500ms delay between image changes

    const handleMouseMove = useCallback((event: React.MouseEvent) => {
        const now = Date.now();
        if (now - lastMoveTime.current < transitionDelay) return; // Increased delay

        const rect = event.currentTarget.getBoundingClientRect();
        const x = event.clientX - rect.left; // x position within the element
        const width = rect.width;
        
        if (x < width / 2) { // Left half
            if (lastMoveDirection.current !== 'left' || currentImageIndex < images.length - 1) {
                setCurrentImageIndex(prev => (prev + 1) % images.length);
                lastMoveDirection.current = 'left';
            }
        } else { // Right half
            if (lastMoveDirection.current !== 'right' || currentImageIndex > 0) {
                setCurrentImageIndex(prev => (prev - 1 + images.length) % images.length);
                lastMoveDirection.current = 'right';
            }
        }

        lastMoveTime.current = now;
    }, [currentImageIndex, images.length]);

    const handleMouseEnter = () => setHovered(true);
    const handleMouseLeave = () => {
        setHovered(false);
        setCurrentImageIndex(0);
        lastMoveDirection.current = null;
    };

    const getBaseUrl = () => {
        return `${window.location.protocol}//${window.location.host}`;
    };

    const copyToClipboard = async (itemId: string) => {
        const baseUrl = getBaseUrl();
        const itemLink = `${baseUrl}/ItemsDetails/${itemId}`;

        try {
            await navigator.clipboard.writeText(itemLink);
            toast.success("Link copied to clipboard!", {
                id: 'clipboard-toast',
                position: 'top-center',
                style: {
                    border: '1px solid #48BB98',
                    backgroundColor: '#FFFFFF',
                    color: 'black',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    borderRadius: '8px',
                    fontSize: '16px',
                    padding: '16px 24px',
                    whiteSpace: 'nowrap',
                },
                duration: 3000, 
            });
        } catch (err) {
            console.error('Failed to copy item link: ', err);
            toast.error("Failed to copy link!", {
                id: 'clipboard-toast-error', 
                style: {
                    border: '1px solid #E53E3E',
                    backgroundColor: '#FFFFFF',
                    color: 'black',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    borderRadius: '8px',
                    fontSize: '16px',
                    padding: '16px 24px',
                    whiteSpace: 'nowrap',
                },
                duration: 3000,
            });
        }
    };

    return (
        <div
            className="relative flex flex-col text-gray-700 bg-white shadow-sm bg-clip-border rounded-xl w-[300px] h-[450px] hover:shadow-lg m-3"
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <Link
                to={`/ItemsDetails/${item._id}`}
                className="relative overflow-hidden text-gray-700 bg-white bg-clip-border h-96"
            >
                {/* Default (first) image */}
                <img
                    src={images[0]?.url}
                    alt="Default product image"
                    className={`absolute top-0 left-0 object-cover w-[300px] h-[450px] transition-opacity duration-500 ease-in-out ${
                        !hovered ? 'opacity-100' : 'opacity-0'
                    }`}
                />
                {/* Other images */}
                {images.map((image, index) => (
                    <img
                        key={image._id}
                        src={image.url}
                        alt={`Product image ${index + 1}`}
                        className={`absolute top-0 left-0 object-cover w-[300px] h-[450px] transition-opacity duration-500 ease-in-out ${
                            hovered && index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                        }`}
                    />
                ))}
            </Link>
            <div className="p-2">
                <div className="flex-col items-center justify-between">
                    <Link
                    to={`/ItemsDetails/${item._id}`}
                    className="block text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                        {item.name}
                    </Link>
                    <div className="flex justify-between items-center">
                        <p className="block text-base antialiased font-medium leading-relaxed text-gray-500">
                            ${item.price}
                        </p>
                        <button
                            onClick={() => copyToClipboard(item._id)}
                            className="flex items-center justify-center w-10 h-10 text-gray-500 rounded-full bg-white border-2 border-gray-300 cursor-pointer hover:border-slate-900 hover:text-slate-900"
                        >
                            <FontAwesomeIcon icon={faShareNodes} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemsCard;