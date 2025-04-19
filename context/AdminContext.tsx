"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Define the context type
interface AdminContextType {
  isNavOpen: boolean;
  updateNavStatus: (status: boolean) => void;
}

// Create the context with a default value
const AdminContext = createContext<AdminContextType | undefined>(undefined);

// Define the provider's props type
interface AdminProviderProps {
  children: ReactNode;
}

export const AdminProvider: React.FC<AdminProviderProps> = ({ children }) => {
  const [isNavOpen, setIsNavOpen] = useState<boolean>(true);

  // Function to update the nav status
  const updateNavStatus = (status: boolean) => {
    setIsNavOpen(status);
  };

  // Detect screen width and update isNavOpen state accordingly
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1024) {
        setIsNavOpen(false);
      } else {
        setIsNavOpen(true);
      }
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Call handleResize initially to check screen size when component mounts
    handleResize();

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <AdminContext.Provider value={{ isNavOpen, updateNavStatus }}>
      {children}
    </AdminContext.Provider>
  );
};

// Custom hook to use the AdminContext
export const useAdminContext = (): AdminContextType => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdminContext must be used within an AdminProvider");
  }
  return context;
};
