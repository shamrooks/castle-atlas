import React from 'react';
import { cn } from "@/lib/utils";

const LoadingSpinner = React.forwardRef(({
  className,
  size = "default",
  variant = "primary",
  ...props
}, ref) => {
  const sizes = {
    sm: "h-4 w-4",
    default: "h-6 w-6",
    lg: "h-8 w-8",
    xl: "h-12 w-12"
  };

  const variants = {
    primary: "text-primary",
    secondary: "text-secondary",
    white: "text-white",
    muted: "text-text-muted"
  };

  return (
    <div
      ref={ref}
      role="status"
      className={cn("animate-spin", sizes[size], variants[variant], className)}
      {...props}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  );
});

const LoadingDots = React.forwardRef(({
  className,
  size = "default",
  variant = "primary",
  ...props
}, ref) => {
  const sizes = {
    sm: "h-1 w-1 [&>div]:h-1 [&>div]:w-1",
    default: "h-2 w-2 [&>div]:h-2 [&>div]:w-2",
    lg: "h-3 w-3 [&>div]:h-3 [&>div]:w-3",
  };

  const variants = {
    primary: "[&>div]:bg-primary",
    secondary: "[&>div]:bg-secondary",
    white: "[&>div]:bg-white",
    muted: "[&>div]:bg-text-muted"
  };

  const delays = ["animate-delay-0", "animate-delay-150", "animate-delay-300"];

  return (
    <div
      ref={ref}
      role="status"
      className={cn(
        "flex space-x-1",
        sizes[size],
        variants[variant],
        className
      )}
      {...props}
    >
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={cn(
            "animate-bounce rounded-full",
            delays[i]
          )}
        />
      ))}
      <span className="sr-only">Loading...</span>
    </div>
  );
});

LoadingSpinner.displayName = "LoadingSpinner";
LoadingDots.displayName = "LoadingDots";

export { LoadingSpinner, LoadingDots };