import { Stack } from 'expo-router';
import { StyleSheet, FlatList, ListRenderItem } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ShoppingListItem } from '@/components/ShoppingListItem';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useShoppingContext } from '@/contexts/ShoppingContext';
import { ShoppingItem } from '@/types';

export default function ListScreen() {
  const colorScheme = useColorScheme();
  const { items } = useShoppingContext();

  const renderItem: ListRenderItem<ShoppingItem> = ({ item }) => (
    <ShoppingListItem 
      item={item}
      // TODO: Issue #10で購入状態切り替え機能を実装
      // onToggleComplete={toggleItem}
      // TODO: Issue #11で削除機能を実装
      // onDelete={deleteItem}
    />
  );

  const EmptyComponent = () => (
    <ThemedView style={styles.emptyStateContainer}>
      <IconSymbol
        name="list.bullet"
        size={64}
        color={Colors[colorScheme ?? 'light'].tabIconDefault}
        style={styles.emptyIcon}
      />
      <ThemedText style={styles.emptyText}>商品がありません</ThemedText>
      <ThemedText style={styles.emptySubtext}>
        「追加」タブで新しい商品を追加してください
      </ThemedText>
    </ThemedView>
  );
  
  return (
    <>
      <Stack.Screen options={{ title: '買い物リスト', headerShown: false }} />
      <SafeAreaView style={styles.safeArea}>
        <ThemedView style={styles.container}>
          <ThemedView style={styles.titleContainer}>
            <ThemedText type="title" style={styles.titleText}>買い物リスト</ThemedText>
            <ThemedText style={styles.itemCount}>
              {items.length > 0 ? `${items.length}件の商品` : '準備はいいですか？'}
            </ThemedText>
          </ThemedView>
          
          <FlatList
            data={items}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={[
              styles.listContainer,
              items.length === 0 && styles.emptyListContainer
            ]}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={EmptyComponent}
            // パフォーマンス最適化設定
            removeClippedSubviews={true}
            maxToRenderPerBatch={10}
            windowSize={10}
          />
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
    backgroundColor: 'transparent',
  },
  titleContainer: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 24,
    paddingTop: 20,
    backgroundColor: 'transparent',
  },
  titleText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 8,
  },
  itemCount: {
    fontSize: 16,
    color: '#64748b',
    marginTop: 4,
    fontWeight: '500',
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  emptyListContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    backgroundColor: 'transparent',
  },
  emptyIcon: {
    marginBottom: 24,
    opacity: 0.5,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
    color: '#374151',
  },
  emptySubtext: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 22,
  },
});