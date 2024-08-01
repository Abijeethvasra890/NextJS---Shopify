import axios from "axios";
import { useContext } from 'react';
import CartContext from '../../context/CartContext';


const ProductDetail = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  
  const handleAddToCart = () => {
    const cartItem = {
      title: product.title,
      image: product.images.edges[0]?.node.originalSrc,
      price: product.variants.edges[0]?.node.price,
      variantId: product.variants.edges[0]?.node.id,
      quantity: 1, // Default to 1 for simplicity
    };
  
    addToCart(cartItem);
    window.alert("Item Added to Cart")
  };

  
    return (
      <>
      <div className="flex flex-col md:flex-row">
        <div className="flex justify-center flex-col lg:flex-row gap-5 m-10 ">
        {product.images.edges.length > 0 && (
          <div>
            <img 
              key={product.images.edges[0].node.originalSrc} 
              src={product.images.edges[0].node.originalSrc} 
              alt={product.images.edges[0].node.altText}
              className="h-92 w-60 lg:h-96 lg:min-w-[500px]"
            />
            <div className="flex flex-row mt-4">
              {product.images.edges.slice(1).map((image) => (
                <img 
                  key={image.node.originalSrc} 
                  src={image.node.originalSrc} 
                  alt={image.node.altText}
                  className="h-32 w-32 lg:w-[200px]"
                />
              ))}
            </div>
          </div>
        )}
        </div>
        <div className="flex flex-col mt-10 ">
          <div>
            <h1 className='font-bold text-5xl'>{product.title}</h1>
            <p className="italic m-2 mt-10">{product.description}</p>
          </div>
          <div className="flex justify-center">
            <button className="bg-slate-700 text-white px-4 py-2 rounded-2xl mt-40 min-w-[500px]" onClick={handleAddToCart}>
              Add to Cart
            </button>
          </div>
        </div>
      </div> 
      </>
    );
  };
  
  export default ProductDetail;
  