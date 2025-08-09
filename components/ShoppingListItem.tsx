/**
 * ShoppingListItem Component
 * Issue #9で基本表示を実装
 * Issue #10で購入状態切り替え機能を実装 - UIを美しく改善
 * Issue #11で削除機能を追加予定
 */

import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, { 
  useAnimatedStyle, 
  withSpring, 
  withTiming, 
  interpolate 
} from 'react-native-reanimated';
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
  
  // デバッグ用
  console.log(`Item ${item.name} - isCompleted: ${item.isCompleted}`);

  // チェックボックスのアニメーション - 枠線と背景は変化させない
  const checkboxAnimatedStyle = useAnimatedStyle(() => {
    const scale = item.isCompleted
      ? withSpring(1.05, { damping: 15 })
      : withSpring(1.0, { damping: 15 });

    return {
      transform: [{ scale }],
    };
  });

  // チェックマークのアニメーション（シンプルに）
  const checkmarkAnimatedStyle = useAnimatedStyle(() => {
    const scale = item.isCompleted
      ? withSpring(1.2, { damping: 10 })
      : withSpring(0, { damping: 10 });

    return {
      transform: [{ scale }],
    };
  });

  // テキストのアニメーション
  const textAnimatedStyle = useAnimatedStyle(() => {
    const opacity = item.isCompleted
      ? withTiming(0.6, { duration: 200 })
      : withTiming(1, { duration: 200 });

    return { opacity };
  });

  return (
    <ThemedView style={[
      styles.container, 
      item.isCompleted && styles.completedContainer
    ]}>
      {/* 美しいチェックボックス領域 */}
      <TouchableOpacity 
        style={styles.checkboxTouchArea}
        onPress={() => onToggleComplete?.(item.id)}
        activeOpacity={0.7}
      >
        <Animated.View style={[styles.checkbox, checkboxAnimatedStyle]}>
          <ThemedText style={[
            styles.checkmark,
            { opacity: item.isCompleted ? 1 : 0 }
          ]}>
            ✓
          </ThemedText>
        </Animated.View>
      </TouchableOpacity>

      {/* 商品名表示領域 */}
      <Animated.View style={[styles.textContainer, textAnimatedStyle]}>
        <ThemedText 
          style={[
            styles.itemName,
            item.isCompleted && styles.completedItemName
          ]}
        >
          {item.name}
        </ThemedText>
        
        {/* 作成日時表示 */}
        <ThemedText style={[
          styles.dateText,
          item.isCompleted && styles.completedDateText
        ]}>
          {item.createdAt.toLocaleDateString('ja-JP')}
        </ThemedText>
      </Animated.View>

      {/* 削除ボタン領域 - Issue #11で機能実装予定 */}
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => onDelete?.(item.id)}
        disabled={!onDelete} // Issue #11まで無効化
        activeOpacity={0.6}
      >
        <IconSymbol
          name="trash"
          size={20}
          color={item.isCompleted ? '#94A3B8' : '#64748B'}
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
  completedContainer: {
    backgroundColor: '#f8fafc',
    borderColor: '#e2e8f0',
  },
  checkboxTouchArea: {
    padding: 4, // タッチ領域を広げる
    marginRight: 12,
  },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 8,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderColor: '#D1D5DB',
  },
  checkmark: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#DC2626', // Red-600
    textAlign: 'center',
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
  completedItemName: {
    textDecorationLine: 'line-through',
    color: '#94a3b8',
    opacity: 0.7,
  },
  dateText: {
    fontSize: 13,
    color: '#64748b',
    fontWeight: '500',
  },
  completedDateText: {
    color: '#94a3b8',
    opacity: 0.7,
  },
  deleteButton: {
    padding: 8,
    borderRadius: 6,
    backgroundColor: '#fee2e2',
  },
});