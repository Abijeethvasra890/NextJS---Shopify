import Link from 'next/link';

const ProductCard = ({ product }) => {
  return (
    <li className='h-80 w-64'>
      <Link href={`/products/${product.handle}`}>
        <h2 className='font-bold'>{product.title}</h2>
        <img 
          className='h-56 w-56'
          src={product.images.edges[0]?.node.originalSrc} 
          alt={product.images.edges[0]?.node.altText} />
        <p>
          {product.priceRange.minVariantPrice.amount} {product.priceRange.minVariantPrice.currencyCode}
        </p>
      </Link>
    </li>
  );
};

export default ProductCard;
