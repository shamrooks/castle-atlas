import React from 'react';
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from 'lucide-react';

const Input = React.forwardRef(({
  className,
  type = "text",
  error,
  icon: Icon,
  disabled,
  required,
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const isPassword = type === "password";

  const inputType = isPassword 
    ? (showPassword ? "text" : "password")
    : type;

  return (
    <div className="relative">
      {Icon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">
          <Icon className="h-5 w-5" />
        </div>
      )}
      
      <input
        ref={ref}
        type={inputType}
        className={cn(
          "flex h-10 w-full rounded-md border border-border bg-background px-3 py-2",
          "text-sm ring-offset-background",
          "placeholder:text-text-muted",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          Icon && "pl-10",
          isPassword && "pr-10",
          error && "border-error focus-visible:ring-error",
          className
        )}
        disabled={disabled}
        required={required}
        aria-invalid={error ? "true" : undefined}
        {...props}
      />

      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text"
        >
          {showPassword ? (
            <EyeOff className="h-5 w-5" />
          ) : (
            <Eye className="h-5 w-5" />
          )}
          <span className="sr-only">
            {showPassword ? "Hide password" : "Show password"}
          </span>
        </button>
      )}

      {error && (
        <p className="mt-1 text-sm text-error">
          {error}
        </p>
      )}
    </div>
  );
});

Input.displayName = "Input";

export { Input };