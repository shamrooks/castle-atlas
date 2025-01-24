import React, { useEffect, useCallback } from 'react';
import { cn } from "@/lib/utils";
import { X } from 'lucide-react';

const Dialog = React.forwardRef(({
  className,
  children,
  open = false,
  onClose,
  ...props
}, ref) => {
  const handleEscape = useCallback((event) => {
    if (event.key === 'Escape' && onClose) {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    if (open) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [open, handleEscape]);

  if (!open) return null;

  return (
    <div
      ref={ref}
      className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
      {...props}
    >
      <div className="fixed inset-0 overflow-y-auto">
        <div className="min-h-full flex items-center justify-center p-4">
          <div
            className={cn(
              "relative w-full max-w-lg rounded-lg bg-background p-6 shadow-lg",
              "animate-scale-in",
              className
            )}
            role="dialog"
            aria-modal="true"
          >
            {children}
            {onClose && (
              <button
                onClick={onClose}
                className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

const DialogTrigger = React.forwardRef(({ className, children, ...props }, ref) => (
  <button
    ref={ref}
    className={cn("inline-flex items-center justify-center", className)}
    {...props}
  >
    {children}
  </button>
));

const DialogTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn("text-lg font-semibold mb-4", className)}
    {...props}
  />
));

const DialogDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-text-muted mb-4", className)}
    {...props}
  />
));

const DialogFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex justify-end space-x-2 mt-6", className)}
    {...props}
  />
));

Dialog.displayName = "Dialog";
DialogTrigger.displayName = "DialogTrigger";
DialogTitle.displayName = "DialogTitle";
DialogDescription.displayName = "DialogDescription";
DialogFooter.displayName = "DialogFooter";

export {
  Dialog,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
  DialogFooter
};