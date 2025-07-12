import React from "react";
import { cn } from "@/utils/cn";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Error = ({ 
  message = "Something went wrong", 
  onRetry, 
  className,
  title = "Oops! Something went wrong"
}) => {
  return (
    <div className={cn("flex flex-col items-center justify-center py-12 px-4 text-center", className)}>
      <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-full p-6 mb-6">
        <ApperIcon name="AlertTriangle" size={48} className="text-red-500" />
      </div>
      
      <h3 className="text-xl font-semibold text-secondary-900 mb-2">
        {title}
      </h3>
      
      <p className="text-secondary-600 mb-6 max-w-md">
        {message}
      </p>
      
      {onRetry && (
        <Button
          onClick={onRetry}
          className="flex items-center gap-2"
          variant="primary"
        >
          <ApperIcon name="RefreshCw" size={16} />
          Try Again
        </Button>
      )}
      
      <p className="text-sm text-secondary-500 mt-4">
        If the problem persists, please contact our support team.
      </p>
    </div>
  );
};

export default Error;