import { Stack } from 'expo-router';
import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function AddScreen() {
  return (
    <>
      <Stack.Screen options={{ title: '商品を追加' }} />
      <ThemedView style={styles.container}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">商品を追加</ThemedText>
        </ThemedView>
        
        <ThemedView style={styles.inputContainer}>
          <ThemedText type="subtitle">商品名</ThemedText>
          {/* TODO: TextInputコンポーネントをIssue #8で実装 */}
          <ThemedView style={styles.inputPlaceholder}>
            <ThemedText>商品名入力フィールド（Issue #8で実装予定）</ThemedText>
          </ThemedView>
        </ThemedView>
        
        <ThemedView style={styles.buttonContainer}>
          {/* TODO: 追加ボタンをIssue #8で実装 */}
          <ThemedView style={styles.buttonPlaceholder}>
            <ThemedText>追加ボタン（Issue #8で実装予定）</ThemedText>
          </ThemedView>
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
  inputContainer: {
    marginBottom: 20,
  },
  inputPlaceholder: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 15,
    marginTop: 8,
    backgroundColor: '#f8f8f8',
  },
  buttonContainer: {
    marginTop: 10,
  },
  buttonPlaceholder: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: 'center',
  },
});