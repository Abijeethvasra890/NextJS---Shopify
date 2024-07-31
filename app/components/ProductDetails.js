import axios from "axios";

const ProductDetail = ({ product }) => {
    const handleCheckout = async () => {
      const response = await axios.post('/api/checkout', { variantId: product.variants.edges[0].node.id });
      window.location.href = response.data.checkoutUrl;
    };
  
    return (
      <div>
        <h1 className='font-bold'>{product.title}</h1>
        <p className="italic m-2">{product.description}</p>
        <div className="flex h-92 w-60 gap-5 m-10">
          {product.images.edges.map((image) => (
            <img 
              key={image.node.originalSrc} 
              src={image.node.originalSrc} 
              alt={image.node.altText}
              />
          ))}
        </div>
        <div className="flex justify-center">
          <button 
            onClick={handleCheckout} 
            className="bg-amber-700 p-2 rounded-md">
            Buy Now
          </button>
        </div>
      </div>
    );
  };
  
  export default ProductDetail;
  