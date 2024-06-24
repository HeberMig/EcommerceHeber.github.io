import { createContext, useState } from 'react';

export const CategoriesContext = createContext();

export const CategoriesProvider = ({ children }) => {
  const [categoryFilter, setCategoryFilter] = useState('');

  return (
    <CategoriesContext.Provider value={{ categoryFilter, setCategoryFilter }}>
      {children}
    </CategoriesContext.Provider>
  );
};