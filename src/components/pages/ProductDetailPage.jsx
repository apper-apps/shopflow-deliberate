import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";
import PriceDisplay from "@/components/molecules/PriceDisplay";
import QuantitySelector from "@/components/molecules/QuantitySelector";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { useCart } from "@/hooks/useCart";
import { productService } from "@/services/api/productService";

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    loadProduct();
  }, [id]);

  useEffect(() => {
    if (product) {
      loadRelatedProducts();
    }
  }, [product]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      setError("");
      await new Promise(resolve => setTimeout(resolve, 300));
      const data = await productService.getById(parseInt(id));
      if (data) {
        setProduct(data);
      } else {
        setError("Product not found.");
      }
    } catch (err) {
      setError("Failed to load product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const loadRelatedProducts = async () => {
    try {
      const allProducts = await productService.getAll();
      const related = allProducts
        .filter(p => p.category === product.category && p.Id !== product.Id)
        .slice(0, 4);
      setRelatedProducts(related);
    } catch (err) {
      console.error("Failed to load related products:", err);
    }
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    toast.success(`Added ${quantity} item(s) to cart!`);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate("/checkout");
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Loading type="detail" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Error 
          message={error || "Product not found"} 
          onRetry={loadProduct}
          title="Unable to load product"
        />
      </div>
    );
  }

  const hasDiscount = product.originalPrice && product.originalPrice > product.price;

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-secondary-600 mb-8">
          <button onClick={() => navigate("/")} className="hover:text-primary-600">
            Home
          </button>
          <ApperIcon name="ChevronRight" size={16} />
          <button 
            onClick={() => navigate(`/category/${product.category}`)}
            className="hover:text-primary-600 capitalize"
          >
            {product.category}
          </button>
          <ApperIcon name="ChevronRight" size={16} />
          <span className="text-secondary-900">{product.name}</span>
        </nav>

        {/* Product Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid md:grid-cols-2 gap-12 mb-16"
        >
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative bg-white rounded-xl shadow-sm border border-secondary-100 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-96 object-cover"
                />
              </AnimatePresence>
              
              {hasDiscount && (
                <Badge variant="sale" className="absolute top-4 left-4 shadow-md">
                  SALE
                </Badge>
              )}
              
              {!product.inStock && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <Badge variant="error" className="text-white bg-red-500 text-lg px-4 py-2">
                    Out of Stock
                  </Badge>
                </div>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative bg-white rounded-lg border-2 overflow-hidden transition-all duration-200 ${
                      selectedImage === index 
                        ? "border-primary-500 ring-2 ring-primary-200" 
                        : "border-secondary-200 hover:border-primary-300"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-20 object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge variant="primary" className="mb-2 capitalize">
                {product.category}
              </Badge>
              <h1 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
                {product.name}
              </h1>
              
              <PriceDisplay
                price={product.price}
                originalPrice={product.originalPrice}
                size="xl"
                className="mb-6"
              />
            </div>

            <div className="prose prose-secondary max-w-none">
              <p className="text-lg text-secondary-700 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Purchase Section */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-secondary-100">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="font-medium text-secondary-900">Quantity:</span>
                  <QuantitySelector
                    quantity={quantity}
                    onChange={setQuantity}
                    disabled={!product.inStock}
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                    className="flex-1 flex items-center justify-center gap-2"
                    size="lg"
                  >
                    <ApperIcon name="ShoppingCart" size={20} />
                    Add to Cart
                  </Button>
                  <Button
                    onClick={handleBuyNow}
                    disabled={!product.inStock}
                    variant="accent"
                    className="flex-1 flex items-center justify-center gap-2"
                    size="lg"
                  >
                    <ApperIcon name="Zap" size={20} />
                    Buy Now
                  </Button>
                </div>

                {!product.inStock && (
                  <p className="text-red-600 text-center font-medium">
                    This item is currently out of stock
                  </p>
                )}
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                  <ApperIcon name="Truck" size={20} className="text-green-600" />
                </div>
                <p className="text-sm font-medium text-secondary-900">Free Shipping</p>
                <p className="text-xs text-secondary-600">On orders over $50</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                  <ApperIcon name="RotateCcw" size={20} className="text-blue-600" />
                </div>
                <p className="text-sm font-medium text-secondary-900">Easy Returns</p>
                <p className="text-xs text-secondary-600">30-day policy</p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                  <ApperIcon name="Shield" size={20} className="text-purple-600" />
                </div>
                <p className="text-sm font-medium text-secondary-900">Warranty</p>
                <p className="text-xs text-secondary-600">1-year coverage</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-secondary-900 mb-8">
              Related Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <motion.div
                  key={relatedProduct.Id}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-xl shadow-sm border border-secondary-100 overflow-hidden cursor-pointer"
                  onClick={() => navigate(`/product/${relatedProduct.Id}`)}
                >
                  <img
                    src={relatedProduct.images[0]}
                    alt={relatedProduct.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-medium text-secondary-900 line-clamp-2 mb-2">
                      {relatedProduct.name}
                    </h3>
                    <PriceDisplay
                      price={relatedProduct.price}
                      originalPrice={relatedProduct.originalPrice}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;