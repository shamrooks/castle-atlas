import React from 'react';
import { Book } from 'lucide-react';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

const PageLoader = ({ message = "Loading...", showLogo = true }) => {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50">
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        {showLogo && (
          <div className="mb-8 animate-breathe">
            <Book className="h-16 w-16 text-primary" />
          </div>
        )}

        <div className="flex flex-col items-center gap-4">
          <LoadingSpinner size="lg" variant="primary" />
          <p className="text-lg text-text-muted animate-pulse">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
};

// Full page loader with progress
export const PageLoaderWithProgress = ({ 
  progress, 
  message = "Loading...", 
  showLogo = true 
}) => {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50">
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        {showLogo && (
          <div className="mb-8 animate-breathe">
            <Book className="h-16 w-16 text-primary" />
          </div>
        )}

        <div className="flex flex-col items-center gap-4 w-full max-w-md">
          <LoadingSpinner size="lg" variant="primary" />
          <p className="text-lg text-text-muted">
            {message}
          </p>

          {/* Progress bar */}
          <div className="w-full h-2 bg-surface-hover rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-text-muted">
            {progress}% complete
          </p>
        </div>
      </div>
    </div>
  );
};

// Minimal loader for smaller sections
export const SectionLoader = ({ message = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <LoadingSpinner size="default" variant="primary" />
      <p className="mt-4 text-text-muted">
        {message}
      </p>
    </div>
  );
};

// Overlay loader for modals or cards
export const OverlayLoader = ({ message = "Loading..." }) => {
  return (
    <div className="absolute inset-0 bg-background/60 backdrop-blur-sm rounded-lg flex items-center justify-center z-50">
      <div className="flex flex-col items-center gap-2">
        <LoadingSpinner size="default" variant="primary" />
        <p className="text-sm text-text-muted">
          {message}
        </p>
      </div>
    </div>
  );
};

// Inline loader for buttons or text
export const InlineLoader = ({ message = "Loading..." }) => {
  return (
    <div className="flex items-center gap-2">
      <LoadingSpinner size="sm" variant="primary" />
      <span className="text-sm text-text-muted">
        {message}
      </span>
    </div>
  );
};

export default PageLoader;