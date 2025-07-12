import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import ProductCard from "@/components/organisms/ProductCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";

const ProductGrid = ({ 
  products, 
  loading, 
  error, 
  onRetry, 
  className,
  emptyProps = {}
}) => {
  if (loading) {
    return <Loading type="grid" className={className} />;
  }

  if (error) {
    return (
      <Error
        message={error}
        onRetry={onRetry}
        className={className}
      />
    );
  }

  if (!products || products.length === 0) {
    return (
      <Empty
        title="No products found"
        message="Try adjusting your search or browse our categories to find what you're looking for."
        actionLabel="Browse All Products"
        onAction={() => window.location.href = "/"}
        {...emptyProps}
        className={className}
      />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6",
        className
      )}
    >
      {products.map((product, index) => (
        <motion.div
          key={product.Id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <ProductCard product={product} />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ProductGrid;