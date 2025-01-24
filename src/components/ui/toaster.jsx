import React, { useState, useEffect } from 'react';

const Toast = ({ message, type = 'info', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const baseClasses = "fixed flex items-center p-4 rounded-lg shadow-lg transition-all duration-300";
  const typeClasses = {
    info: "bg-primary text-white",
    success: "bg-success text-white",
    error: "bg-error text-white",
    warning: "bg-warning text-white"
  };

  return (
    <div className={`${baseClasses} ${typeClasses[type]} bottom-4 right-4`}>
      <span>{message}</span>
      <button
        onClick={onClose}
        className="ml-4 hover:opacity-80 transition-opacity"
      >
        ×
      </button>
    </div>
  );
};

const Toaster = () => {
  const [toasts, setToasts] = useState([]);

  // Add this to window so it can be called from anywhere
  window.showToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  return (
    <div className="fixed bottom-0 right-0 p-4 space-y-4 z-50">
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
};

export default Toaster;