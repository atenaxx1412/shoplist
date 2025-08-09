import { Stack } from 'expo-router';
import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function ListScreen() {
  const colorScheme = useColorScheme();
  
  return (
    <>
      <Stack.Screen options={{ title: '買い物リスト' }} />
      <ThemedView style={styles.container}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">買い物リスト</ThemedText>
        </ThemedView>
        
        {/* 空状態の表示（Issue #9でFlatListに置き換え予定） */}
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
        
        {/* TODO: Issue #9でFlatListを実装 */}
        <ThemedView style={styles.listPlaceholder}>
          <ThemedText>商品リスト（Issue #9で実装予定）</ThemedText>
          <ThemedText>• 商品名とチェックボックス</ThemedText>
          <ThemedText>• 購入済み状態の表示</ThemedText>
          <ThemedText>• 削除機能</ThemedText>
        </ThemedView>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyIcon: {
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 18,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 14,
    opacity: 0.7,
    textAlign: 'center',
    marginBottom: 30,
  },
  listPlaceholder: {
    backgroundColor: '#f0f0f0',
    padding: 20,
    borderRadius: 8,
    marginTop: 20,
  },
});