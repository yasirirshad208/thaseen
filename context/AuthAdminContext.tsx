"use client"
// context/AuthAdminContext.tsx
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

interface AuthAdminContextProps {
  isAdmin: boolean;
  setIsAdmin: (value: boolean) => void;
  checkAdmin: () => Promise<boolean>;
}

const AuthAdminContext = createContext<AuthAdminContextProps | undefined>(undefined);

export const AuthAdminProvider = ({ children }: { children: ReactNode }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  const checkAdmin = async (): Promise<boolean> => {
    const token = localStorage.getItem('authToken');
    if (!token) return false;
  
    try {
      const response = await axios.get('/api/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      const isAdmin = response.data.user.admin;
      setIsAdmin(isAdmin);
      return isAdmin;
    } catch (err) {
      localStorage.removeItem('authToken');
      setIsAdmin(false);
      return false;
    }
  };
  

  useEffect(() => {
    checkAdmin();
  }, []);

  return (
    <AuthAdminContext.Provider value={{ isAdmin, setIsAdmin, checkAdmin }}>
      {children}
    </AuthAdminContext.Provider>
  );
};

export const useAuthAdmin = ():AuthAdminContextProps  => {
  const context = useContext(AuthAdminContext);
  if (!context) throw new Error('useAuthAdmin must be used within AuthAdminProvider');
  return context;
};
