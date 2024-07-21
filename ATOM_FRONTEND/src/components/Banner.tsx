import React, { useState, useEffect } from 'react';

const bannerMessages = [
  "Discover our summer collection with up to 50% off on selected items!",
  "New arrivals are here! Check out the latest trends in fashion.",
  "Flash Sale: Get 30% off on all accessories for a limited time.",
  "Upgrade your wardrobe with our premium quality outfits.",
  "Enjoy free shipping on orders over $50!",
  "Exclusive offer: Buy one, get one 50% off on all jeans.",
  "Stay stylish with our newly launched designer collection.",
  "Hurry! Limited-time offer on our bestselling jackets.",
  "Unbeatable prices on our winter collection. Shop now!",
  "Get ready for the season with our fresh arrivals.",
  "End of season sale: Up to 70% off on selected items.",
  "Join our loyalty program and earn points on every purchase.",
  "Don't miss out on our daily deals and discounts!",
  "Shop the latest trends with our new arrivals section.",
  "Exclusive online offers just for you. Explore now!",
  "Refresh your look with our new spring collection.",
  "Limited edition pieces now available. Shop the look!",
  "Discover comfort and style with our casual wear range.",
  "Shop sustainably with our eco-friendly clothing line.",
  "Special offer: Extra 20% off on clearance items."
];

const Banner: React.FC = () => {
  const [messageIndex, setMessageIndex] = useState<number>(0);
  const [animate, setAnimate] = useState<boolean>(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimate(false); // Remove animation class

      setTimeout(() => {
        setAnimate(true)
        setMessageIndex((prevIndex) => (prevIndex + 1) % bannerMessages.length);
    },0); // Add animation class after delay
  
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div id="banner" className="flex  z-50 gap-8 justify-center py-3 items-center px-4 w-full border border-b  border-black lg:py-2 bg-black">
      <div className="flex-grow flex justify-center">
        <p className={`text-md font-light  text-white ${animate ? 'banner-text-animation' : ''}`}>
          {bannerMessages[messageIndex]}
        </p>
      </div>
    </div>
  );
};

export default Banner;
