import React, { useState, useEffect } from "react";
import { cn } from "@/utils/cn";
import Label from "@/components/atoms/Label";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";

const PriceFilter = ({ onPriceChange, className, min = 0, max = 1000 }) => {
  const [minPrice, setMinPrice] = useState(min);
  const [maxPrice, setMaxPrice] = useState(max);

  const handleApply = () => {
    onPriceChange({ min: minPrice, max: maxPrice });
  };

  const handleReset = () => {
    setMinPrice(min);
    setMaxPrice(max);
    onPriceChange({ min, max });
  };

  return (
    <div className={cn("space-y-4", className)}>
      <h3 className="font-semibold text-secondary-900">Price Range</h3>
      <div className="space-y-3">
        <div>
          <Label htmlFor="min-price">Min Price</Label>
          <Input
            id="min-price"
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(Number(e.target.value))}
            min={min}
            max={maxPrice}
            placeholder="$0"
          />
        </div>
        <div>
          <Label htmlFor="max-price">Max Price</Label>
          <Input
            id="max-price"
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            min={minPrice}
            max={max}
            placeholder="$1000"
          />
        </div>
        <div className="flex gap-2">
          <Button onClick={handleApply} size="sm" className="flex-1">
            Apply
          </Button>
          <Button onClick={handleReset} variant="outline" size="sm" className="flex-1">
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PriceFilter;