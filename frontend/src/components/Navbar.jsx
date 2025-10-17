import React from "react";
import { ShoppingCart, Search, Menu } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Left Section */}
          <div className="flex items-center space-x-3">
            <Menu className="h-6 w-6 text-gray-700 md:hidden cursor-pointer" />
            <h1 className="text-2xl font-extrabold text-indigo-600 tracking-wide">
              WooCart
            </h1>
          </div>

          {/* Center Section (Search Bar) */}
          <div className="hidden md:flex items-center w-1/2 relative">
            <input
              type="text"
              placeholder="Search for products..."
              className="w-full px-4 py-2 rounded-full border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
            <Search className="h-5 w-5 text-gray-500 absolute right-3" />
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-6">
            <a
              href="#"
              className="text-gray-700 hover:text-indigo-600 transition duration-200 font-medium"
            >
              Home
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-indigo-600 transition duration-200 font-medium"
            >
              Segments
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-indigo-600 transition duration-200 font-medium"
            >
              Docs
            </a>

            <div className="relative cursor-pointer">
              <ShoppingCart className="h-6 w-6 text-gray-700 hover:text-indigo-600" />
              <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs px-1.5 py-0.5 rounded-full">
                3
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="px-4 py-2 md:hidden">
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-4 py-2 rounded-full border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        />
      </div>
    </nav>
  );
};

export default Navbar;
