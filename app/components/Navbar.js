import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className='flex justify-between bg-slate-800 p-4 text-white"'>
      <h1 className="text-xl font-bold">Vasra Store</h1>
      <div>
        <Link href="/">PLP </Link>
        <Link href="/cart">Cart</Link>
      </div>
    </nav>
  );
};

export default Navbar;
