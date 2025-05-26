// Layout.jsx
 // adjust path if needed
import { Outlet } from 'react-router-dom';
import Footer from '../Model/Landing/Footer';

function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Optional: Add Navbar here */}

      <main className="flex-grow">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default Layout;
