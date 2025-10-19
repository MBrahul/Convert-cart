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
      
    </nav>
  );
};

export default Navbar;
