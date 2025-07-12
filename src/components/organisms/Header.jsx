import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import SearchBar from "@/components/molecules/SearchBar";
import { useCart } from "@/hooks/useCart";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cart } = useCart();
  const navigate = useNavigate();
  
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const categories = [
    { name: "Electronics", href: "/category/electronics" },
    { name: "Clothing", href: "/category/clothing" },
    { name: "Home & Garden", href: "/category/home" },
    { name: "Sports", href: "/category/sports" },
    { name: "Books", href: "/category/books" }
  ];

  const handleSearch = (query) => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50 backdrop-blur-sm bg-white/95">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-2">
        <div className="container mx-auto px-4 text-center text-sm">
          🎉 Free shipping on orders over $50! Limited time offer.
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg p-2">
              <ApperIcon name="ShoppingBag" size={24} className="text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
              ShopFlow
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={category.href}
                className="text-secondary-600 hover:text-primary-600 transition-colors duration-200 font-medium"
              >
                {category.name}
              </Link>
            ))}
            <Link
              to="/deals"
              className="text-accent-600 hover:text-accent-700 transition-colors duration-200 font-medium flex items-center gap-1"
            >
              <ApperIcon name="Zap" size={16} />
              Deals
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:block flex-1 max-w-md mx-8">
            <SearchBar onSearch={handleSearch} />
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            {/* Mobile Search */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => {/* Implement mobile search modal */}}
            >
              <ApperIcon name="Search" size={20} />
            </Button>

            {/* Cart */}
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="sm" className="relative">
                <ApperIcon name="ShoppingCart" size={20} />
                {cartItemCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 bg-gradient-to-r from-accent-500 to-accent-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium"
                  >
                    {cartItemCount > 99 ? "99+" : cartItemCount}
                  </motion.span>
                )}
              </Button>
            </Link>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <ApperIcon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-secondary-200 bg-white"
          >
            <div className="container mx-auto px-4 py-4">
              {/* Mobile Search */}
              <div className="md:hidden mb-4">
                <SearchBar onSearch={handleSearch} />
              </div>
              
              {/* Mobile Navigation */}
              <nav className="space-y-2">
                {categories.map((category) => (
                  <Link
                    key={category.name}
                    to={category.href}
                    className="block py-2 px-4 text-secondary-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {category.name}
                  </Link>
                ))}
                <Link
                  to="/deals"
                  className="block py-2 px-4 text-accent-600 hover:text-accent-700 hover:bg-accent-50 rounded-lg transition-all duration-200 flex items-center gap-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <ApperIcon name="Zap" size={16} />
                  Deals
                </Link>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;