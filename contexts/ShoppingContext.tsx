/**
 * Shopping List Context
 * Issue #9で商品データを画面間で共有するための基本的なContext
 * Issue #12でAsyncStorageと統合予定
 */

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ShoppingItem } from '@/types';

interface ShoppingContextType {
  items: ShoppingItem[];
  addItem: (item: ShoppingItem) => void;
  toggleItem: (id: string) => void;
  deleteItem: (id: string) => void;
}

const ShoppingContext = createContext<ShoppingContextType | undefined>(undefined);

interface ShoppingProviderProps {
  children: ReactNode;
}

export function ShoppingProvider({ children }: ShoppingProviderProps) {
  const [items, setItems] = useState<ShoppingItem[]>([]);

  const addItem = (item: ShoppingItem) => {
    setItems(prevItems => [...prevItems, item]);
    // TODO: Issue #12でAsyncStorageに保存
    console.log('Item added to context:', item);
  };

  const toggleItem = (id: string) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
      )
    );
    // TODO: Issue #12でAsyncStorageに保存
  };

  const deleteItem = (id: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
    // TODO: Issue #12でAsyncStorageに保存
  };

  const value: ShoppingContextType = {
    items,
    addItem,
    toggleItem,
    deleteItem,
  };

  return (
    <ShoppingContext.Provider value={value}>
      {children}
    </ShoppingContext.Provider>
  );
}

export function useShoppingContext(): ShoppingContextType {
  const context = useContext(ShoppingContext);
  if (context === undefined) {
    throw new Error('useShoppingContext must be used within a ShoppingProvider');
  }
  return context;
}