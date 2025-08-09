import { Stack } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, Alert, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Crypto from 'expo-crypto';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ShoppingItem } from '@/types';
import { useShoppingContext } from '@/contexts/ShoppingContext';

export default function AddScreen() {
  const [itemName, setItemName] = useState('');
  const { addItem } = useShoppingContext();

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

    addItem(newItem); // Contextのメソッドを使用
    setItemName(''); // 入力フィールドをクリア
    Keyboard.dismiss(); // キーボードを閉じる
    
    console.log('New item added to context:', newItem);
  };

  return (
    <>
      <Stack.Screen options={{ title: '商品を追加', headerShown: false }} />
      <SafeAreaView style={styles.safeArea}>
        <ThemedView style={styles.container}>
          <ThemedView style={styles.titleContainer}>
            <ThemedText type="title" style={styles.titleText}>何を買いますか？</ThemedText>
            <ThemedText style={styles.subtitleText}>
              買い物リストに追加したい商品名を入力してください
            </ThemedText>
          </ThemedView>
          
          <ThemedView style={styles.inputContainer}>
            <ThemedText type="subtitle" style={styles.labelText}>商品名</ThemedText>
            <TextInput
              style={styles.input}
              placeholder="例：牛乳、パン、卵..."
              placeholderTextColor="#888"
              value={itemName}
              onChangeText={setItemName}
              onSubmitEditing={handleAddItem}
              returnKeyType="done"
              autoCapitalize="none"
              clearButtonMode="while-editing"
            />
          </ThemedView>
          
          <TouchableOpacity 
            style={styles.button} 
            onPress={handleAddItem}
            activeOpacity={0.8}
          >
            <ThemedText style={styles.buttonText}>リストに追加</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
    backgroundColor: 'transparent',
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 40,
    paddingTop: 20,
    backgroundColor: 'transparent',
  },
  titleText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 8,
  },
  subtitleText: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 22,
  },
  inputContainer: {
    marginBottom: 32,
    backgroundColor: 'transparent',
  },
  labelText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    borderWidth: 2,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    fontSize: 16,
    backgroundColor: '#ffffff',
    color: '#1e293b',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  button: {
    backgroundColor: '#3b82f6',
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
    marginTop: 8,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});