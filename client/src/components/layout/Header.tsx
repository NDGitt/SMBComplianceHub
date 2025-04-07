import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

const Header = () => {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const isActive = (path: string) => {
    return location === path;
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-primary"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V6.414A2 2 0 0016.414 5L14 2.586A2 2 0 0012.586 2H9z" />
            <path d="M3 8a2 2 0 012-2h2a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
          </svg>
          <span className="text-xl font-bold text-primary">SMBlink</span>
        </Link>
        <div className="hidden md:flex space-x-6">
          <Link
            href="/"
            className={`${
              isActive("/") 
                ? "text-primary font-medium" 
                : "text-gray-600 hover:text-primary"
            }`}
          >
            Home
          </Link>
          <Link
            href="/discovery"
            className={`${
              isActive("/discovery") 
                ? "text-primary font-medium" 
                : "text-gray-600 hover:text-primary"
            }`}
          >
            How It Works
          </Link>
          <Link
            href="/providers"
            className={`${
              isActive("/providers") 
                ? "text-primary font-medium" 
                : "text-gray-600 hover:text-primary"
            }`}
          >
            Providers
          </Link>
          <a href="#" className="text-gray-600 hover:text-primary">
            About
          </a>
        </div>
        <div>
          <Link href="/discovery">
            <Button>Get Started</Button>
          </Link>
        </div>
        <button
          id="mobile-menu-button"
          className="md:hidden"
          onClick={toggleMobileMenu}
        >
          <Menu className="h-6 w-6" />
        </button>
      </nav>
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 py-3 bg-white border-t border-gray-200">
          <Link
            href="/"
            className="block py-2 text-gray-600 hover:text-primary"
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/discovery"
            className="block py-2 text-gray-600 hover:text-primary"
            onClick={() => setMobileMenuOpen(false)}
          >
            How It Works
          </Link>
          <Link
            href="/providers"
            className="block py-2 text-gray-600 hover:text-primary"
            onClick={() => setMobileMenuOpen(false)}
          >
            Providers
          </Link>
          <a
            href="#"
            className="block py-2 text-gray-600 hover:text-primary"
            onClick={() => setMobileMenuOpen(false)}
          >
            About
          </a>
        </div>
      )}
    </header>
  );
};

export default Header;
