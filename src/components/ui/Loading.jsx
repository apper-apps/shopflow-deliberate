import React from "react";
import { cn } from "@/utils/cn";

const Loading = ({ className, type = "grid" }) => {
  if (type === "grid") {
    return (
      <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6", className)}>
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm border border-secondary-100 overflow-hidden">
            <div className="w-full h-64 bg-gradient-to-r from-secondary-100 to-secondary-200 animate-pulse" />
            <div className="p-4 space-y-3">
              <div className="h-4 bg-gradient-to-r from-secondary-100 to-secondary-200 animate-pulse rounded" />
              <div className="h-6 bg-gradient-to-r from-secondary-100 to-secondary-200 animate-pulse rounded w-2/3" />
              <div className="h-10 bg-gradient-to-r from-secondary-100 to-secondary-200 animate-pulse rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === "detail") {
    return (
      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-4">
          <div className="w-full h-96 bg-gradient-to-r from-secondary-100 to-secondary-200 animate-pulse rounded-xl" />
          <div className="grid grid-cols-4 gap-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="w-full h-20 bg-gradient-to-r from-secondary-100 to-secondary-200 animate-pulse rounded-lg" />
            ))}
          </div>
        </div>
        <div className="space-y-6">
          <div className="h-8 bg-gradient-to-r from-secondary-100 to-secondary-200 animate-pulse rounded" />
          <div className="h-6 bg-gradient-to-r from-secondary-100 to-secondary-200 animate-pulse rounded w-1/3" />
          <div className="space-y-2">
            <div className="h-4 bg-gradient-to-r from-secondary-100 to-secondary-200 animate-pulse rounded" />
            <div className="h-4 bg-gradient-to-r from-secondary-100 to-secondary-200 animate-pulse rounded" />
            <div className="h-4 bg-gradient-to-r from-secondary-100 to-secondary-200 animate-pulse rounded w-3/4" />
          </div>
          <div className="h-12 bg-gradient-to-r from-secondary-100 to-secondary-200 animate-pulse rounded-lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-12">
      <div className="flex items-center space-x-2">
        <div className="w-3 h-3 bg-primary-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-3 h-3 bg-primary-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-3 h-3 bg-primary-500 rounded-full animate-bounce"></div>
      </div>
    </div>
  );
};

export default Loading;