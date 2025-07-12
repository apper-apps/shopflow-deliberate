import React from "react";
import { cn } from "@/utils/cn";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const QuantitySelector = ({ quantity, onChange, min = 1, max = 99, className }) => {
  const handleDecrease = () => {
    if (quantity > min) {
      onChange(quantity - 1);
    }
  };

  const handleIncrease = () => {
    if (quantity < max) {
      onChange(quantity + 1);
    }
  };

  return (
    <div className={cn("flex items-center border border-secondary-200 rounded-lg", className)}>
      <Button
        variant="ghost"
        size="sm"
        onClick={handleDecrease}
        disabled={quantity <= min}
        className="h-10 w-10 p-0 hover:bg-secondary-100 rounded-l-lg rounded-r-none border-r border-secondary-200"
      >
        <ApperIcon name="Minus" size={16} />
      </Button>
      <span className="flex-1 text-center px-3 py-2 min-w-[50px] font-medium">
        {quantity}
      </span>
      <Button
        variant="ghost"
        size="sm"
        onClick={handleIncrease}
        disabled={quantity >= max}
        className="h-10 w-10 p-0 hover:bg-secondary-100 rounded-r-lg rounded-l-none border-l border-secondary-200"
      >
        <ApperIcon name="Plus" size={16} />
      </Button>
    </div>
  );
};

export default QuantitySelector;