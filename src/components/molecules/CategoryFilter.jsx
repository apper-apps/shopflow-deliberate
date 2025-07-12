import React from "react";
import { cn } from "@/utils/cn";
import Button from "@/components/atoms/Button";

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange, className }) => {
  return (
    <div className={cn("space-y-2", className)}>
      <h3 className="font-semibold text-secondary-900 mb-4">Categories</h3>
      <div className="space-y-1">
        <Button
          variant={selectedCategory === "all" ? "primary" : "ghost"}
          onClick={() => onCategoryChange("all")}
          className="w-full justify-start text-left"
        >
          All Products
        </Button>
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "primary" : "ghost"}
            onClick={() => onCategoryChange(category)}
            className="w-full justify-start text-left capitalize"
          >
            {category}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;