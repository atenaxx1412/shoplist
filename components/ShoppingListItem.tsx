/**
 * ShoppingListItem Component
 * Issue #9で基本表示を実装
 * Issue #10で購入状態切り替え機能を追加予定
 * Issue #11で削除機能を追加予定
 */

import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { ShoppingItem } from '@/types';

interface ShoppingListItemProps {
  item: ShoppingItem;
  // TODO: Issue #10で実装予定
  onToggleComplete?: (id: string) => void;
  // TODO: Issue #11で実装予定  
  onDelete?: (id: string) => void;
}

export function ShoppingListItem({ 
  item, 
  onToggleComplete, 
  onDelete 
}: ShoppingListItemProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <ThemedView style={styles.container}>
      {/* チェックボックス領域 - Issue #10で機能実装予定 */}
      <TouchableOpacity 
        style={styles.checkbox}
        onPress={() => onToggleComplete?.(item.id)}
        disabled={!onToggleComplete} // Issue #10まで無効化
      >
        <IconSymbol
          name={item.isCompleted ? "checkmark.square.fill" : "square"}
          size={24}
          color={item.isCompleted ? colors.tint : colors.tabIconDefault}
        />
      </TouchableOpacity>

      {/* 商品名表示領域 */}
      <View style={styles.textContainer}>
        <ThemedText 
          style={[
            styles.itemName,
            item.isCompleted && styles.completedText
          ]}
        >
          {item.name}
        </ThemedText>
        
        {/* 作成日時表示 */}
        <ThemedText style={styles.dateText}>
          {item.createdAt.toLocaleDateString('ja-JP')}
        </ThemedText>
      </View>

      {/* 削除ボタン領域 - Issue #11で機能実装予定 */}
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => onDelete?.(item.id)}
        disabled={!onDelete} // Issue #11まで無効化
      >
        <IconSymbol
          name="trash"
          size={20}
          color={colors.tabIconDefault}
        />
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginVertical: 6,
    marginHorizontal: 4,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  checkbox: {
    padding: 8,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
    marginRight: 12,
  },
  itemName: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
    lineHeight: 22,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#94a3b8',
    opacity: 0.7,
  },
  dateText: {
    fontSize: 13,
    color: '#64748b',
    fontWeight: '500',
  },
  deleteButton: {
    padding: 8,
    borderRadius: 6,
    backgroundColor: '#fee2e2',
  },
});