"use client"

import { createContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  //const checkoutUrl = 'https://your-shopify-store-domain/checkout'; // Replace with your actual Shopify checkout URL

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
    console.log("added product to cart", cart);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
