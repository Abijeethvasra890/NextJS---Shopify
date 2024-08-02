import Link from 'next/link';

const ProductCard = ({ product }) => {
  return (
    <li className='h-70 w-64 bg-slate-500 bg-opacity-30 mt-10 p-5 rounded-2xl'>
      <Link href={`/products/${product.handle}`} className='flex flex-col justify-center items-center'>
        <img 
          className='h-56 w-56 rounded-lg'
          src={product.images.edges[0]?.node.originalSrc} 
          alt={product.images.edges[0]?.node.altText} />
        <h2 className='font-bold mt-5'>{product.title}</h2>
        <p>
          {product.priceRange.minVariantPrice.amount} {product.priceRange.minVariantPrice.currencyCode}
        </p>
      </Link>
    </li>
  );
};

export default ProductCard;
