import React from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import QuantitySelector from "@/components/molecules/QuantitySelector";
import PriceDisplay from "@/components/molecules/PriceDisplay";
import Empty from "@/components/ui/Empty";
import { useCart } from "@/hooks/useCart";

const CartSidebar = ({ isOpen, onClose }) => {
  const { cart, updateQuantity, removeFromCart, getCartTotal } = useCart();

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

  const cartTotal = getCartTotal();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-secondary-200">
              <h2 className="text-lg font-semibold text-secondary-900">
                Shopping Cart ({cart.length})
              </h2>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <ApperIcon name="X" size={20} />
              </Button>
            </div>

            {/* Cart Content */}
            <div className="flex-1 overflow-y-auto">
              {cart.length === 0 ? (
                <div className="h-full flex items-center justify-center">
                  <Empty
                    title="Your cart is empty"
                    message="Start shopping to add items to your cart."
                    actionLabel="Start Shopping"
                    onAction={() => {
                      onClose();
                      window.location.href = "/";
                    }}
                    icon="ShoppingCart"
                  />
                </div>
              ) : (
                <div className="p-6 space-y-4">
                  {cart.map((item) => (
                    <motion.div
                      key={item.productId}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 100 }}
                      className="flex gap-4 p-4 bg-secondary-50 rounded-xl"
                    >
                      {/* Product Image */}
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-secondary-900 line-clamp-2 text-sm">
                          {item.name}
                        </h3>
                        <PriceDisplay price={item.price} size="sm" />
                        
                        <div className="flex items-center justify-between mt-2">
                          <QuantitySelector
                            quantity={item.quantity}
                            onChange={(newQuantity) => handleQuantityChange(item.productId, newQuantity)}
                            className="w-32"
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
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="border-t border-secondary-200 p-6 space-y-4">
                {/* Total */}
                <div className="flex items-center justify-between text-lg font-semibold">
                  <span>Total:</span>
                  <PriceDisplay price={cartTotal} size="lg" showSale={false} />
                </div>

                {/* Actions */}
                <div className="space-y-3">
                  <Link to="/cart" onClick={onClose}>
                    <Button variant="outline" className="w-full">
                      View Cart
                    </Button>
                  </Link>
                  <Link to="/checkout" onClick={onClose}>
                    <Button className="w-full">
                      Checkout
                    </Button>
                  </Link>
                </div>

                {/* Trust Badges */}
                <div className="flex justify-center gap-4 text-xs text-secondary-500 pt-2">
                  <div className="flex items-center gap-1">
                    <ApperIcon name="Shield" size={12} />
                    <span>Secure</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ApperIcon name="Truck" size={12} />
                    <span>Free Shipping</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ApperIcon name="RotateCcw" size={12} />
                    <span>Easy Returns</span>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartSidebar;