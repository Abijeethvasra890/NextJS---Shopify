"use client"

import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../app/components/ProductCard';
import Layout from '../app/components/Layout';

const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const response = await axios.get('/api/products');
      setProducts(response.data);
    }

    fetchProducts();
  }, []);

  return (
    <Layout>
      <ul className='grid md:grid-cols-3 lg:grid-cols-4 ml-20'>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ul>
    </Layout>
  );
};

export default HomePage;
