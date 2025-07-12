import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import PriceDisplay from "@/components/molecules/PriceDisplay";
import QuantitySelector from "@/components/molecules/QuantitySelector";
import Empty from "@/components/ui/Empty";
import { useCart } from "@/hooks/useCart";

const CartPage = () => {
  const { cart, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart();

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(productId);
      toast.success("Item removed from cart");
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleRemoveItem = (productId) => {
    removeFromCart(productId);
    toast.success("Item removed from cart");
  };

  const handleClearCart = () => {
    clearCart();
    toast.success("Cart cleared");
  };

  const cartTotal = getCartTotal();
  const shipping = cartTotal > 50 ? 0 : 9.99;
  const tax = cartTotal * 0.08;
  const finalTotal = cartTotal + shipping + tax;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-secondary-50 to-white">
        <div className="container mx-auto px-4 py-16">
          <Empty
            title="Your cart is empty"
            message="Looks like you haven't added any items to your cart yet. Start shopping to fill it up!"
            actionLabel="Start Shopping"
            onAction={() => window.location.href = "/"}
            icon="ShoppingCart"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-secondary-900">Shopping Cart</h1>
            <p className="text-secondary-600 mt-1">{cart.length} items in your cart</p>
          </div>
          <Button
            variant="outline"
            onClick={handleClearCart}
            className="flex items-center gap-2 text-red-600 border-red-200 hover:bg-red-50"
          >
            <ApperIcon name="Trash2" size={16} />
            Clear Cart
          </Button>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item, index) => (
              <motion.div
                key={item.productId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                layout
                className="bg-white rounded-xl shadow-sm border border-secondary-100 p-6"
              >
                <div className="flex gap-4">
                  {/* Product Image */}
                  <Link to={`/product/${item.productId}`}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg hover:scale-105 transition-transform duration-200"
                    />
                  </Link>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <Link to={`/product/${item.productId}`}>
                      <h3 className="font-semibold text-secondary-900 hover:text-primary-600 transition-colors duration-200 line-clamp-2 mb-2">
                        {item.name}
                      </h3>
                    </Link>
                    
                    <PriceDisplay price={item.price} size="default" showSale={false} />
                    
                    <div className="flex items-center justify-between mt-4">
                      <QuantitySelector
                        quantity={item.quantity}
                        onChange={(newQuantity) => handleQuantityChange(item.productId, newQuantity)}
                      />
                      
                      <div className="flex items-center gap-4">
                        <PriceDisplay 
                          price={item.price * item.quantity} 
                          size="default"
                          showSale={false}
                          className="font-bold"
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveItem(item.productId)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <ApperIcon name="Trash2" size={16} />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-xl shadow-lg border border-secondary-100 p-6 sticky top-24">
              <h2 className="text-xl font-bold text-secondary-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-secondary-600">Subtotal:</span>
                  <PriceDisplay price={cartTotal} showSale={false} />
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary-600">Shipping:</span>
                  <span className="font-medium">
                    {shipping === 0 ? (
                      <span className="text-green-600">FREE</span>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary-600">Tax:</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-secondary-200 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-secondary-900">Total:</span>
                    <PriceDisplay price={finalTotal} size="lg" showSale={false} />
                  </div>
                </div>
              </div>

              {shipping > 0 && (
                <div className="bg-accent-50 border border-accent-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center gap-2 text-accent-700">
                    <ApperIcon name="Truck" size={16} />
                    <span className="text-sm font-medium">
                      Add ${(50 - cartTotal).toFixed(2)} more for FREE shipping!
                    </span>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                <Link to="/checkout">
                  <Button size="lg" className="w-full flex items-center justify-center gap-2">
                    <ApperIcon name="CreditCard" size={20} />
                    Proceed to Checkout
                  </Button>
                </Link>
                <Link to="/">
                  <Button variant="outline" className="w-full">
                    Continue Shopping
                  </Button>
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-3 mt-6 pt-6 border-t border-secondary-200">
                <div className="text-center">
                  <div className="bg-green-100 rounded-full w-10 h-10 flex items-center justify-center mx-auto mb-2">
                    <ApperIcon name="Shield" size={16} className="text-green-600" />
                  </div>
                  <span className="text-xs text-secondary-600">Secure</span>
                </div>
                <div className="text-center">
                  <div className="bg-blue-100 rounded-full w-10 h-10 flex items-center justify-center mx-auto mb-2">
                    <ApperIcon name="Truck" size={16} className="text-blue-600" />
                  </div>
                  <span className="text-xs text-secondary-600">Fast Ship</span>
                </div>
                <div className="text-center">
                  <div className="bg-purple-100 rounded-full w-10 h-10 flex items-center justify-center mx-auto mb-2">
                    <ApperIcon name="RotateCcw" size={16} className="text-purple-600" />
                  </div>
                  <span className="text-xs text-secondary-600">Returns</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;