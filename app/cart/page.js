'use client';

import axios from 'axios';
import { useContext } from 'react';
import CartContext from '../../context/CartContext';
import Layout from '../components/Layout';

const CartPage = () => {
  const { cart } = useContext(CartContext);
  console.log(cart);

  const handleCheckout = async () => {
    try {
      const response = await axios.post('/api/checkout', { cart });
      window.location.href = response.data.checkoutUrl;
    } catch (error) {
      console.error('Checkout failed:', error);
    }
  };

  if (cart.length === 0) {
    return (
      <Layout>
        <h1>Your Cart</h1>
        <p>Your cart is empty.</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <h1>Your Cart</h1>
      <ul>
        {cart.map((item, index) => (
          <li key={index} className="p-5 mb-2 flex justify-around bg-slate-700 mt-5 rounded-2xl">
            <img src={item.image} alt={item.title} className="w-32 h-32 object-cover" />
            <div >
                <h2 className="text-xl font-semibold">{item.title}</h2>
                <p>{item.price.amount} {item.price.currencyCode}</p>
                <p>Quantity: {item.quantity}</p>
            </div>
          </li>
        ))}
      </ul>
      <div className='flex justify-center'>
        <button className="bg-amber-800 text-white px-4 py-2 rounded " onClick={handleCheckout}>
            Proceed to Checkout
        </button>
      </div>
    </Layout>
  );
};

export default CartPage;
