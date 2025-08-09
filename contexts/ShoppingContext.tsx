/**
 * Shopping List Context
 * Issue #9で商品データを画面間で共有するための基本的なContext
 * Issue #12でAsyncStorageと統合 - データ永続化実装完了
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { ShoppingItem } from '@/types';

interface ShoppingContextType {
  items: ShoppingItem[];
  isLoading: boolean;
  addItem: (item: ShoppingItem) => void;
  toggleItem: (id: string) => void;
  deleteItem: (id: string) => void;
}

const ShoppingContext = createContext<ShoppingContextType | undefined>(undefined);

interface ShoppingProviderProps {
  children: ReactNode;
}

// AsyncStorage ストレージキー
const STORAGE_KEY = '@shopping_list_items';

// データ保存関数
const saveShoppingItems = async (items: ShoppingItem[]): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(items, (key, value) => {
      // Date オブジェクトを ISO 文字列に変換
      if (key === 'createdAt' && value instanceof Date) {
        return value.toISOString();
      }
      return value;
    });
    await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
    console.log('Shopping items saved successfully');
  } catch (error) {
    console.error('Failed to save shopping items:', error);
    Alert.alert('保存エラー', 'データの保存に失敗しました。');
  }
};

// データ読み込み関数
const loadShoppingItems = async (): Promise<ShoppingItem[]> => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    if (jsonValue !== null) {
      const parsedItems = JSON.parse(jsonValue);
      // データバリデーションと Date オブジェクト復元
      const validatedItems: ShoppingItem[] = parsedItems.map((item: any) => ({
        id: item.id || '',
        name: item.name || '',
        isCompleted: Boolean(item.isCompleted),
        createdAt: new Date(item.createdAt),
      }));
      console.log('Shopping items loaded successfully:', validatedItems.length, 'items');
      return validatedItems;
    }
    console.log('No saved shopping items found');
    return [];
  } catch (error) {
    console.error('Failed to load shopping items:', error);
    Alert.alert('読み込みエラー', 'データの読み込みに失敗しました。');
    return [];
  }
};

export function ShoppingProvider({ children }: ShoppingProviderProps) {
  const [items, setItems] = useState<ShoppingItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // アプリ起動時のデータ読み込み
  useEffect(() => {
    const initializeData = async () => {
      const savedItems = await loadShoppingItems();
      setItems(savedItems);
      setIsLoading(false);
    };
    
    initializeData();
  }, []);

  // アイテム変更時の自動保存（デバウンス付き）
  useEffect(() => {
    if (!isLoading && items.length >= 0) {
      // 300ms後に保存（頻繁な更新を防ぐ）
      const timeoutId = setTimeout(() => {
        saveShoppingItems(items);
      }, 300);
      
      return () => clearTimeout(timeoutId);
    }
  }, [items, isLoading]);

  const addItem = (item: ShoppingItem) => {
    setItems(prevItems => {
      const newItems = [...prevItems, item];
      console.log('Item added to context:', item);
      return newItems;
    });
  };

  const toggleItem = (id: string) => {
    setItems(prevItems =>
      prevItems.map(item => {
        if (item.id === id) {
          const updatedItem = { ...item, isCompleted: !item.isCompleted };
          console.log(`Toggling item ${item.name}: ${item.isCompleted} -> ${updatedItem.isCompleted}`);
          return updatedItem;
        }
        return item;
      })
    );
  };

  const deleteItem = (id: string) => {
    setItems(prevItems => {
      const itemToDelete = prevItems.find(item => item.id === id);
      if (itemToDelete) {
        console.log('Item deleted from context:', itemToDelete.name);
      }
      return prevItems.filter(item => item.id !== id);
    });
  };

  const value: ShoppingContextType = {
    items,
    isLoading,
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