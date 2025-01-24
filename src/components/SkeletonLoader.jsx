import React from 'react';
import { cn } from "@/lib/utils";

export const Skeleton = ({ className, ...props }) => (
  <div
    className={cn(
      "animate-pulse rounded-md bg-surface-hover",
      className
    )}
    {...props}
  />
);

export const SkeletonCard = () => (
  <div className="space-y-3">
    <Skeleton className="h-[125px] w-full rounded-lg" />
    <div className="space-y-2">
      <Skeleton className="h-4 w-[250px]" />
      <Skeleton className="h-4 w-[200px]" />
    </div>
  </div>
);

export const SkeletonList = ({ count = 3 }) => (
  <div className="space-y-4">
    {Array(count).fill().map((_, i) => (
      <div key={i} className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    ))}
  </div>
);

export const SkeletonTable = ({ rows = 5, columns = 4 }) => (
  <div className="w-full">
    {/* Header */}
    <div className="flex space-x-4 mb-4">
      {Array(columns).fill().map((_, i) => (
        <Skeleton key={i} className="h-8 flex-1" />
      ))}
    </div>
    
    {/* Rows */}
    <div className="space-y-4">
      {Array(rows).fill().map((_, i) => (
        <div key={i} className="flex space-x-4">
          {Array(columns).fill().map((_, j) => (
            <Skeleton key={j} className="h-6 flex-1" />
          ))}
        </div>
      ))}
    </div>
  </div>
);

export const SkeletonStats = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    {Array(4).fill().map((_, i) => (
      <div key={i} className="p-4 rounded-lg border border-border">
        <Skeleton className="h-4 w-20 mb-2" />
        <Skeleton className="h-8 w-32" />
      </div>
    ))}
  </div>
);

export const SkeletonForm = () => (
  <div className="space-y-6 max-w-md">
    <div className="space-y-2">
      <Skeleton className="h-4 w-20" />
      <Skeleton className="h-10 w-full" />
    </div>
    <div className="space-y-2">
      <Skeleton className="h-4 w-20" />
      <Skeleton className="h-10 w-full" />
    </div>
    <div className="space-y-2">
      <Skeleton className="h-4 w-20" />
      <Skeleton className="h-32 w-full" />
    </div>
    <Skeleton className="h-10 w-full" />
  </div>
);

export const SkeletonAvatar = ({ size = "default" }) => {
  const sizes = {
    sm: "h-8 w-8",
    default: "h-10 w-10",
    lg: "h-16 w-16",
    xl: "h-24 w-24"
  };

  return (
    <Skeleton className={cn("rounded-full", sizes[size])} />
  );
};