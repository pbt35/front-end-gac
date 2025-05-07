'use client';

import React, { createContext, ReactNode, useContext, useState } from 'react';

interface UserContextType {
  token: string | null;
  setToken: (token: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
    children: ReactNode;
  }

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);

  return (
    <UserContext.Provider value={{ token, setToken }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within a UserProvider');
  return context;
};
