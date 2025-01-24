import React, { useState, useRef, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { Check, ChevronDown, ChevronUp, X } from 'lucide-react';

const Select = React.forwardRef(({
  className,
  options = [],
  value,
  onChange,
  placeholder = "Select an option",
  disabled = false,
  error,
  searchable = false,
  multiple = false,
  renderOption,
  clearable = true,
  ...props
}, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter options based on search query
  const filteredOptions = searchable
    ? options.filter(option =>
        option.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : options;

  // Handle option selection
  const handleSelect = (option) => {
    if (multiple) {
      const newValue = Array.isArray(value) ? value : [];
      const isSelected = newValue.some(v => v.value === option.value);
      
      if (isSelected) {
        onChange(newValue.filter(v => v.value !== option.value));
      } else {
        onChange([...newValue, option]);
      }
    } else {
      onChange(option);
      setIsOpen(false);
    }
    
    if (searchable) {
      setSearchQuery("");
      inputRef.current?.focus();
    }
  };

  // Handle clear selection
  const handleClear = (e) => {
    e.stopPropagation();
    onChange(multiple ? [] : null);
    setSearchQuery("");
  };

  // Custom option rendering
  const renderOptionContent = (option) => {
    if (renderOption) return renderOption(option);
    return option.label;
  };

  // Get display value
  const getDisplayValue = () => {
    if (!value) return placeholder;
    if (multiple) {
      return Array.isArray(value) && value.length > 0
        ? value.map(v => v.label).join(", ")
        : placeholder;
    }
    return value.label;
  };

  return (
    <div ref={containerRef} className="relative">
      <div
        ref={ref}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={cn(
          "flex min-h-10 w-full items-center justify-between rounded-md border border-border bg-background px-3 py-2",
          "text-sm ring-offset-background",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
          disabled && "cursor-not-allowed opacity-50",
          error && "border-error focus-visible:ring-error",
          className
        )}
        {...props}
      >
        <div className="flex-1 overflow-hidden">
          {searchable && isOpen ? (
            <input
              ref={inputRef}
              type="text"
              className="w-full bg-transparent outline-none placeholder:text-text-muted"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              placeholder={getDisplayValue()}
            />
          ) : (
            <span className={!value ? "text-text-muted" : ""}>
              {getDisplayValue()}
            </span>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          {clearable && value && (
            <button
              onClick={handleClear}
              className="rounded-full p-1 hover:bg-surface-hover"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          {isOpen ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </div>
      </div>

      {isOpen && (
        <div className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border border-border bg-background p-1 shadow-lg">
          {filteredOptions.length === 0 ? (
            <div className="py-2 px-3 text-sm text-text-muted">
              No options available
            </div>
          ) : (
            filteredOptions.map((option) => {
              const isSelected = multiple
                ? Array.isArray(value) && value.some(v => v.value === option.value)
                : value?.value === option.value;

              return (
                <div
                  key={option.value}
                  onClick={() => handleSelect(option)}
                  className={cn(
                    "flex cursor-pointer items-center rounded-sm px-3 py-2 text-sm",
                    "hover:bg-surface-hover",
                    isSelected && "bg-primary/10 text-primary"
                  )}
                >
                  {multiple && (
                    <div className="mr-2">
                      {isSelected && <Check className="h-4 w-4" />}
                    </div>
                  )}
                  {renderOptionContent(option)}
                </div>
              );
            })
          )}
        </div>
      )}

      {error && (
        <p className="mt-1 text-sm text-error">
          {error}
        </p>
      )}
    </div>
  );
});

Select.displayName = "Select";

export { Select };