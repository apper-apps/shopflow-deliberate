import React, { useState } from "react";
import { cn } from "@/utils/cn";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const SortDropdown = ({ onSortChange, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState("featured");

  const sortOptions = [
    { value: "featured", label: "Featured" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "name", label: "Name: A to Z" },
    { value: "newest", label: "Newest" }
  ];

  const handleSortSelect = (sortValue) => {
    setSelectedSort(sortValue);
    onSortChange(sortValue);
    setIsOpen(false);
  };

  const selectedOption = sortOptions.find(option => option.value === selectedSort);

  return (
    <div className={cn("relative", className)}>
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 min-w-[200px] justify-between"
      >
        <span>Sort: {selectedOption?.label}</span>
        <ApperIcon
          name="ChevronDown"
          size={16}
          className={cn("transition-transform duration-200", isOpen && "rotate-180")}
        />
      </Button>
      
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-secondary-200 rounded-lg shadow-lg z-50">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSortSelect(option.value)}
              className={cn(
                "w-full px-4 py-3 text-left hover:bg-secondary-50 transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg",
                selectedSort === option.value && "bg-primary-50 text-primary-600"
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SortDropdown;