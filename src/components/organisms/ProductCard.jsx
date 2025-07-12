import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import PriceDisplay from "@/components/molecules/PriceDisplay";
import { useCart } from "@/hooks/useCart";

const ProductCard = ({ product, className }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    toast.success("Added to cart!");
  };

  const hasDiscount = product.originalPrice && product.originalPrice > product.price;

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className={cn("group", className)}
    >
      <Link to={`/product/${product.Id}`}>
        <div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-secondary-100 overflow-hidden">
          {/* Image Container */}
          <div className="relative overflow-hidden bg-secondary-50">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
            />
            
            {/* Sale Badge */}
            {hasDiscount && (
              <Badge
                variant="sale"
                className="absolute top-3 left-3 shadow-md"
              >
                SALE
              </Badge>
            )}

            {/* Quick Actions */}
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Button
                variant="secondary"
                size="sm"
                className="w-10 h-10 p-0 rounded-full shadow-lg"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  // Handle wishlist
                }}
              >
                <ApperIcon name="Heart" size={16} />
              </Button>
            </div>

            {/* Stock Status */}
            {!product.inStock && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <Badge variant="error" className="text-white bg-red-500">
                  Out of Stock
                </Badge>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="p-4 space-y-3">
            <div>
              <h3 className="font-semibold text-secondary-900 line-clamp-2 group-hover:text-primary-600 transition-colors duration-200">
                {product.name}
              </h3>
              <p className="text-sm text-secondary-500 mt-1 capitalize">
                {product.category}
              </p>
            </div>

            <PriceDisplay
              price={product.price}
              originalPrice={product.originalPrice}
              size="default"
            />

            {/* Description */}
            <p className="text-sm text-secondary-600 line-clamp-2">
              {product.description}
            </p>

            {/* Add to Cart Button */}
            <Button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="w-full flex items-center justify-center gap-2"
              variant={product.inStock ? "primary" : "secondary"}
            >
              <ApperIcon name="ShoppingCart" size={16} />
              {product.inStock ? "Add to Cart" : "Out of Stock"}
            </Button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;