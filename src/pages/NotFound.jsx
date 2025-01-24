import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="text-center">
      <AlertCircle className="h-16 w-16 text-primary mx-auto mb-4" />
      <h1 className="text-4xl font-bold mb-2">404</h1>
      <p className="text-text-muted mb-6">Page not found</p>
      <Button asChild>
        <a href="/">Back to Home</a>
      </Button>
    </div>
  </div>
);

export default NotFound;