import React from "react";
import { cn } from "@/utils/cn";
import Badge from "@/components/atoms/Badge";

const PriceDisplay = ({ price, originalPrice, className, showSale = true, size = "default" }) => {
  const hasDiscount = originalPrice && originalPrice > price;
  const discountPercent = hasDiscount ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  const sizes = {
    sm: "text-lg",
    default: "text-xl",
    lg: "text-2xl",
    xl: "text-3xl"
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span className={cn("font-bold text-secondary-900", sizes[size])}>
        ${price.toFixed(2)}
      </span>
      {hasDiscount && (
        <>
          <span className="text-secondary-400 line-through text-sm">
            ${originalPrice.toFixed(2)}
          </span>
          {showSale && (
            <Badge variant="sale" className="text-xs">
              -{discountPercent}%
            </Badge>
          )}
        </>
      )}
    </div>
  );
};

export default PriceDisplay;