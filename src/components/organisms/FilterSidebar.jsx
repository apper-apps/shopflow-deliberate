import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils/cn";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import CategoryFilter from "@/components/molecules/CategoryFilter";
import PriceFilter from "@/components/molecules/PriceFilter";

const FilterSidebar = ({ 
  isOpen, 
  onClose, 
  categories, 
  selectedCategory, 
  onCategoryChange,
  onPriceChange,
  className 
}) => {
  const sidebarContent = (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between lg:hidden">
        <h2 className="text-lg font-semibold text-secondary-900">Filters</h2>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <ApperIcon name="X" size={20} />
        </Button>
      </div>

      {/* Categories */}
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={onCategoryChange}
      />

      {/* Price Filter */}
      <PriceFilter onPriceChange={onPriceChange} />

      {/* Clear Filters */}
      <div className="pt-4 border-t border-secondary-200">
<Button
          variant="outline"
          onClick={() => {
            onCategoryChange("all");
            onPriceChange({ min: 0, max: 300 });
          }}
          className="w-full"
        >
          Clear All Filters
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className={cn("hidden lg:block", className)}>
        <div className="bg-white rounded-xl shadow-sm border border-secondary-100 p-6 sticky top-24">
          {sidebarContent}
        </div>
      </div>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3 }}
              className="fixed left-0 top-0 bottom-0 w-80 bg-white shadow-xl z-50 p-6 overflow-y-auto lg:hidden"
            >
              {sidebarContent}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default FilterSidebar;