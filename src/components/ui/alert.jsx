import React from 'react';
import { cn } from "@/lib/utils";
import { AlertCircle, CheckCircle2, XCircle, Info } from 'lucide-react';

const icons = {
  default: Info,
  info: Info,
  success: CheckCircle2,
  warning: AlertCircle,
  error: XCircle,
};

const Alert = React.forwardRef(({
  className,
  variant = "default",
  title,
  description,
  icon,
  onClose,
  ...props
}, ref) => {
  const Icon = icon || icons[variant];

  const variants = {
    default: "bg-background border-border",
    info: "bg-primary/10 border-primary/20 text-primary",
    success: "bg-success/10 border-success/20 text-success",
    warning: "bg-warning/10 border-warning/20 text-warning",
    error: "bg-error/10 border-error/20 text-error"
  };

  return (
    <div
      ref={ref}
      role="alert"
      className={cn(
        "relative rounded-lg border p-4",
        variants[variant],
        className
      )}
      {...props}
    >
      <div className="flex items-start gap-4">
        {Icon && <Icon className="h-5 w-5" />}
        <div className="flex-1">
          {title && (
            <h5 className="mb-1 font-medium leading-none tracking-tight">
              {title}
            </h5>
          )}
          {description && (
            <div className="text-sm opacity-90">
              {description}
            </div>
          )}
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="ml-auto -mr-2 -mt-2 p-2 opacity-70 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg"
          >
            <span className="sr-only">Close</span>
            <XCircle className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
});

Alert.displayName = "Alert";

export { Alert };