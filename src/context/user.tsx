'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { UserCategoryType, UserWalletType } from '@/models/user';
import { getWalletsData } from '@/lib/wallet/get-wallets-data';
import { getCategoriesData } from '@/lib/category/get-categories-data';

type User = {
  wallets: UserWalletType[] | null;
  categories: {
    expense: UserCategoryType[] | null;
    income: UserCategoryType[] | null;
  };
};
type UserContext = {
  user: User;
};

const userContext = createContext<UserContext | null>(null);

const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>({
    wallets: null,
    categories: {
      income: null,
      expense: null
    }
  });

  const userId = process.env.NEXT_PUBLIC_TEMP_USER_ID!;

  const getWallets = async () => {
    console.log('getWallets RUNS!!!!!!!!!!!!!!!!');
    const wallets = await getWalletsData(userId);
    console.log('WALLETS: ', wallets.data);
    setUser(prevState => {
      return { ...prevState, wallets: wallets.data };
    });
    console.log('getWallets FINISHES!!!!!!!!!!!!!!!!');
  };
  const getCategories = async () => {
    console.log('getCategories RUNS!!!!!!!!!!!!!!!!');
    const categories = await getCategoriesData(userId);
    setUser(prevState => {
      return { ...prevState, categories: categories.data };
    });
    console.log('getCategories FINISHES!!!!!!!!!!!!!!!!');
  };

  useEffect(() => {
    console.log(`use effect to fetch W and C runs: ${userId}`);
    getWallets();
    getCategories();
    console.log('finish running use effect!!!');
  }, []);

  console.log('USER CONTEXT RENDER!');

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
