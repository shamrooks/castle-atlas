import React from 'react';
import { cn } from "@/lib/utils";

const Button = React.forwardRef(({
  className,
  variant = "primary",
  size = "default",
  asChild = false,
  loading = false,
  disabled = false,
  children,
  ...props
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
  
  const variants = {
    primary: "bg-primary text-white hover:bg-primary-dark",
    secondary: "bg-secondary text-white hover:bg-secondary-dark",
    outline: "border-2 border-current hover:bg-surface-hover",
    ghost: "hover:bg-surface-hover",
    link: "text-primary underline-offset-4 hover:underline"
  };

  const sizes = {
    sm: "h-9 px-3 text-sm",
    default: "h-10 px-4 py-2",
    lg: "h-11 px-8 text-lg",
    icon: "h-10 w-10"
  };

  const loadingStyles = loading ? "relative !text-transparent hover:!text-transparent" : "";

  return (
    <button
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        loadingStyles,
        className
      )}
      disabled={disabled || loading}
      ref={ref}
      {...props}
    >
      {children}
      {loading && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <svg
            className="animate-spin h-5 w-5 text-current"
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
        </div>
      )}
    </button>
  );
});

Button.displayName = "Button";

export { Button };