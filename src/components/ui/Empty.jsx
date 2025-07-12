import React from "react";
import { cn } from "@/utils/cn";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  title = "No products found", 
  message = "Try adjusting your search or browse our categories to find what you're looking for.",
  actionLabel = "Browse All Products",
  onAction,
  icon = "Package",
  className
}) => {
  return (
    <div className={cn("flex flex-col items-center justify-center py-16 px-4 text-center", className)}>
      <div className="bg-gradient-to-r from-primary-50 to-blue-100 rounded-full p-8 mb-6">
        <ApperIcon name={icon} size={64} className="text-primary-500" />
      </div>
      
      <h3 className="text-2xl font-bold text-secondary-900 mb-4">
        {title}
      </h3>
      
      <p className="text-secondary-600 mb-8 max-w-md leading-relaxed">
        {message}
      </p>
      
      {onAction && (
        <Button
          onClick={onAction}
          variant="primary"
          size="lg"
          className="flex items-center gap-2"
        >
          <ApperIcon name="ShoppingBag" size={20} />
          {actionLabel}
        </Button>
      )}
      
      <div className="flex items-center gap-6 mt-8 text-sm text-secondary-500">
        <div className="flex items-center gap-2">
          <ApperIcon name="Truck" size={16} />
          <span>Free Shipping</span>
        </div>
        <div className="flex items-center gap-2">
          <ApperIcon name="RotateCcw" size={16} />
          <span>Easy Returns</span>
        </div>
        <div className="flex items-center gap-2">
          <ApperIcon name="Shield" size={16} />
          <span>Secure Payment</span>
        </div>
      </div>
    </div>
  );
};

export default Empty;