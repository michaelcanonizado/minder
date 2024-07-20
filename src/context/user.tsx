'use client';

import { createContext, useContext, useState } from 'react';
import { UserCategoryType, UserWalletType } from '@/models/user';

export type User = {
  wallets: UserWalletType[];
  categories: {
    expense: UserCategoryType[];
    income: UserCategoryType[];
  };
};
type UserContext = {
  user: User;
};

const userContext = createContext<UserContext | null>(null);

const UserContextProvider = ({
  children,
  userData
}: {
  children: React.ReactNode;
  userData: User;
}) => {
  const [user, setUser] = useState<User>(userData);

  return (
    <userContext.Provider value={{ user }}>{children}</userContext.Provider>
  );
};
export default UserContextProvider;

export const useUserContext = () => {
  const context = useContext(userContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserContextProvider');
  }
  return context;
};
