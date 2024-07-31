import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className='flex justify-between bg-amber-800 p-4 text-white"'>
      <h1 className="text-xl font-bold">My Shopify Store</h1>
      <div>
        <Link href="/">PLP</Link>
      </div>
    </nav>
  );
};

export default Navbar;
