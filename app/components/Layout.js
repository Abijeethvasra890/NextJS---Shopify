import Navbar from "./Navbar";

const Layout = ({ children }) => {
    return (
      <div className="min-h-screen bg-gray-100">
          <Navbar />
        <main className="p-4 bg-black min-h-screen">
          {children}
        </main>
        <footer className="bg-amber-800 p-4 text-white text-center">
          <p>&copy; 2024 My Shopify Store</p>
        </footer>
      </div>
    );
  };
  
  export default Layout;
  