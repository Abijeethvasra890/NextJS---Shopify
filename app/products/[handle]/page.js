"use client"

import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductDetail from '../../components/ProductDetails';
import Layout from '../../components/Layout';

const ProductPage = ({params}) => {
 // const router = useRouter();
  const handle  = params.handle;
  //console.log(handle);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    //console.log('Router:', router);
    if (handle) {
      const fetchProduct = async () => {
        try {
          //console.log("before")
          const response = await axios.get(`/api/products/${handle}`);
          setProduct(response.data);
          //console.log(response.data);
        } catch (error) {
          console.error('Error fetching product:', error);
        }
      };
      fetchProduct();
    }else{
      console.log("Error");
    }
  }, [handle]);

  if (!product) return <p>Loading...</p>;

  return (
    <Layout>
      <ProductDetail product={product} />
    </Layout>
  );
};

export default ProductPage;
