import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className='flex justify-between bg-slate-800 p-4 text-white"'>
      <img src="av_logo.jpg" className='w-16' />
      <div className='flex gap-5 items-center'>
        <Link href="/">PLP </Link>
        <Link href="/cart">Cart</Link>
      </div>
    </nav>
  );
};

export default Navbar;
