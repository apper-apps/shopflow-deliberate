import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ProductGrid from "@/components/organisms/ProductGrid";
import FilterSidebar from "@/components/organisms/FilterSidebar";
import SortDropdown from "@/components/molecules/SortDropdown";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { productService } from "@/services/api/productService";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [sortBy, setSortBy] = useState("featured");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const navigate = useNavigate();

  const categories = ["electronics", "clothing", "home", "sports", "books"];

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    filterAndSortProducts();
  }, [products, selectedCategory, priceRange, sortBy]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError("");
      await new Promise(resolve => setTimeout(resolve, 300));
      const data = await productService.getAll();
      setProducts(data);
    } catch (err) {
      setError("Failed to load products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortProducts = () => {
    let filtered = [...products];

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by price
    filtered = filtered.filter(product => 
      product.price >= priceRange.min && product.price <= priceRange.max
    );

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "newest":
        filtered.sort((a, b) => b.Id - a.Id);
        break;
      default:
        // Featured - keep original order
        break;
    }

    setFilteredProducts(filtered);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category !== "all") {
      navigate(`/category/${category}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 to-white">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 text-white py-16"
      >
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
            Discover Amazing Products
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
            Shop the latest trends and bestsellers with fast shipping and unbeatable prices
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              variant="accent"
              className="flex items-center gap-2 shadow-xl"
              onClick={() => document.getElementById("products").scrollIntoView({ behavior: "smooth" })}
            >
              <ApperIcon name="ShoppingBag" size={20} />
              Shop Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-primary-600"
              onClick={() => navigate("/deals")}
            >
              <ApperIcon name="Zap" size={20} />
              View Deals
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Featured Categories */}
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
            Shop by Category
          </h2>
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
            Explore our wide range of categories and find exactly what you're looking for
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-16">
          {categories.map((category, index) => (
            <motion.button
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleCategoryChange(category)}
              className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 p-6 border border-secondary-100 group"
            >
              <div className="bg-gradient-to-r from-primary-100 to-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:from-primary-200 group-hover:to-blue-200 transition-all duration-300">
                <ApperIcon 
                  name={category === "electronics" ? "Smartphone" : 
                        category === "clothing" ? "Shirt" :
                        category === "home" ? "Home" :
                        category === "sports" ? "Dumbbell" : "Book"}
                  size={24} 
                  className="text-primary-600" 
                />
              </div>
              <h3 className="font-semibold text-secondary-900 capitalize group-hover:text-primary-600 transition-colors duration-300">
                {category}
              </h3>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Products Section */}
      <div id="products" className="container mx-auto px-4 pb-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-secondary-900">
              All Products
            </h2>
            <p className="text-secondary-600 mt-1">
              {filteredProducts.length} products found
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <SortDropdown onSortChange={setSortBy} />
            <Button
              variant="outline"
              onClick={() => setIsFilterOpen(true)}
              className="lg:hidden flex items-center gap-2"
            >
              <ApperIcon name="Filter" size={16} />
              Filters
            </Button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Filter Sidebar */}
          <FilterSidebar
            isOpen={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            onPriceChange={setPriceRange}
            className="w-64 flex-shrink-0"
          />

          {/* Products Grid */}
          <div className="flex-1">
            <ProductGrid
              products={filteredProducts}
              loading={loading}
              error={error}
              onRetry={loadProducts}
              emptyProps={{
                title: "No products match your filters",
                message: "Try adjusting your filters or browse all products to find what you're looking for.",
                actionLabel: "Clear Filters",
                onAction: () => {
setSelectedCategory("all");
                  setPriceRange({ min: 0, max: 300 });
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;