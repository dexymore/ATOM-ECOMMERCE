import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/index'; // Adjust according to your file structure

const CartPage: React.FC = () => {
  // Properly type the useSelector hook
  const cart = useSelector((state: RootState) => state.cart.items);
  console.log(cart); 

  return (
    <div className='h-[90vh]'>
      <h1>Cart Page</h1>
      <div>
        {/* {cart.map((item) => (
          <div key={item._id}>
            <h1>{item.name}</h1>
            <p>{item.price}</p>
          </div>
        ))} */}
      </div>
    </div>
  );
};

export default CartPage;
