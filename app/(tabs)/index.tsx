import { Stack } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, Alert, Keyboard } from 'react-native';
import * as Crypto from 'expo-crypto';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';

// Issue #7で定義された型 (本来は別ファイルからimport)
interface ShoppingItem {
  id: string;
  name: string;
  isCompleted: boolean;
  createdAt: Date;
}

export default function AddScreen() {
  const [itemName, setItemName] = useState('');
  // このリストは将来的にはグローバルな状態管理（Context, Zustandなど）や
  // AsyncStorageと連携させる必要があります (Issue #9, #12)
  const [items, setItems] = useState<ShoppingItem[]>([]);

  const handleAddItem = () => {
    if (itemName.trim() === '') {
      Alert.alert('エラー', '商品名を入力してください。');
      return;
    }

    const newItem: ShoppingItem = {
      id: Crypto.randomUUID(),
      name: itemName.trim(),
      isCompleted: false,
      createdAt: new Date(),
    };

    setItems(prevItems => [...prevItems, newItem]);
    setItemName(''); // 入力フィールドをクリア
    Keyboard.dismiss(); // キーボードを閉じる
    
    // TODO: Issue #9でリスト表示画面に反映させる
    console.log('New item added:', newItem);
    console.log('Current list:', [...items, newItem]);
  };

  return (
    <>
      <Stack.Screen options={{ title: '商品を追加' }} />
      <ThemedView style={styles.container}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">何を買いますか？</ThemedText>
        </ThemedView>
        
        <ThemedView style={styles.inputContainer}>
          <ThemedText type="subtitle">商品名</ThemedText>
          <TextInput
            style={styles.input}
            placeholder="例：牛乳、パン、卵..."
            value={itemName}
            onChangeText={setItemName}
            onSubmitEditing={handleAddItem} // キーボードの完了ボタンで追加
            returnKeyType="done"
          />
        </ThemedView>
        
        <TouchableOpacity 
          style={styles.button} 
          onPress={handleAddItem}
          activeOpacity={0.7}
        >
          <ThemedText style={styles.buttonText}>リストに追加</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#f5f5f5',
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 32,
    backgroundColor: 'transparent',
  },
  inputContainer: {
    marginBottom: 24,
    backgroundColor: 'transparent',
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.light.tint,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginTop: 8,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: Colors.light.tint,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});