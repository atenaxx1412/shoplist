# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
This is a Shopping List mobile app built with React Native, Expo, and TypeScript. The project uses Expo Router for navigation and is designed as an MVP for managing shopping items with add, edit, delete, and persistence functionality using AsyncStorage.

## Key Architecture

### Project Structure
- **app/**: Contains the main application screens using Expo Router file-based routing
  - **(tabs)/**: Tab navigation screens (index.tsx = Home, explore.tsx = Explore)
  - **_layout.tsx**: Root layout with theme provider and Stack navigation
- **components/**: Reusable UI components including themed components (ThemedText, ThemedView)
- **constants/**: Color definitions for light/dark themes
- **hooks/**: Custom hooks for color scheme and theme management
- **assets/**: Static assets (images, fonts)

### Navigation System
- Uses Expo Router with file-based routing
- Bottom tabs navigation implemented in `app/(tabs)/_layout.tsx`
- Root layout in `app/_layout.tsx` with Stack navigation and theme provider
- Automatic dark/light mode switching based on system preferences

### Theming System
- Dual theme support (light/dark) defined in `constants/Colors.ts`
- Theme-aware components: ThemedText, ThemedView
- Uses React Navigation's theme provider
- Custom color scheme hook in `hooks/useColorScheme.ts`

### TypeScript Configuration
- Strict TypeScript enabled
- Path aliases configured: `@/*` maps to project root
- Includes Expo type definitions

## Development Commands

### Core Commands
```bash
# Install dependencies
npm install

# Start development server
npm start
# or
npx expo start

# Platform-specific development
npm run android    # Launch Android
npm run ios        # Launch iOS  
npm run web        # Launch Web

# Code quality
npm run lint       # Run ESLint

# Reset to clean project
npm run reset-project
```

### Development Workflow
- Use `npm start` to launch Expo development server
- Scan QR code with Expo Go app for mobile testing
- Press 'w' to open in web browser during development
- Press 'a' for Android emulator, 'i' for iOS simulator

## MVP Specification
According to `shopping_list_mvp_spec.md`, the app should implement:

### Core Features
- **Add items**: Text input with add button functionality
- **Item list**: Display all shopping items with FlatList
- **Toggle completion**: Checkbox to mark items as purchased (with strikethrough styling)
- **Delete items**: Remove items from the list
- **Data persistence**: AsyncStorage integration for data persistence
- **Tab navigation**: Two tabs - "Add" and "List" screens

### Data Structure
```typescript
interface ShoppingItem {
  id: string;          // UUID
  name: string;        // Item name
  isCompleted: boolean; // Purchase status
  createdAt: Date;     // Creation timestamp
}
```

### AsyncStorage Key
- Use `@shopping_list_items` as the storage key
- Store as JSON string of ShoppingItem array

## Detailed MVP Requirements

### 1. Functional Requirements

#### 1.1 商品追加機能
- **UI Elements**:
  - 商品名入力フィールド（TextInput）
  - 追加ボタン（Button）
- **Behavior**:
  - 商品名を入力して追加ボタンを押すとリストに追加
  - 追加後は入力フィールドをクリア
  - 空文字の場合は追加しない

#### 1.2 商品リスト表示機能
- **UI Elements**:
  - 商品リスト（FlatList）
  - 各商品アイテム（チェックボックス + 商品名 + 削除ボタン）
- **Behavior**:
  - 商品が縦方向にリスト表示される
  - リストが空の場合は「商品がありません」を表示

#### 1.3 商品状態管理機能
- **UI Elements**:
  - チェックボックス（TouchableOpacity + アイコン）
- **Behavior**:
  - チェックボックスタップで購入済み/未購入を切り替え
  - 購入済み商品は打ち消し線とグレーアウト表示

#### 1.4 商品削除機能
- **UI Elements**:
  - 削除ボタン（TouchableOpacity + アイコン）
- **Behavior**:
  - 削除ボタンタップで該当商品をリストから削除

#### 1.5 データ永続化機能
- **Technology**: AsyncStorage
- **Behavior**:
  - アプリ起動時に保存済みデータを読み込み
  - 商品の追加・削除・状態変更時に自動保存

#### 1.6 画面遷移機能
- **Technology**: React Navigation (Bottom Tabs)
- **Screen Structure**:
  - 「追加」タブ: 商品追加画面
  - 「リスト」タブ: 商品一覧画面

### 2. Screen Design

#### 2.1 商品追加画面 (AddScreen)
- ヘッダー: "商品を追加"
- 商品名入力フィールド
- 追加ボタン
- シンプルで直感的なレイアウト

#### 2.2 商品リスト画面 (ListScreen)
- ヘッダー: "買い物リスト"
- 商品一覧 (FlatList)
- 各アイテム: [☐/☑] 商品名 [削除]
- 空状態の表示

#### 2.3 ボトムタブナビゲーション
- 追加タブ: プラスアイコン
- リストタブ: リストアイコン

### 3. Technical Constraints

#### 3.1 Development Environment
- Expo SDK 53以上
- React Native 0.79.5
- TypeScript ~5.8.3
- React Navigation v7

#### 3.2 Platform Support
- iOS (Expo Go)
- Android (Expo Go)

#### 3.3 External Dependencies
```json
{
  "@react-navigation/native": "^7.1.6",
  "@react-navigation/bottom-tabs": "^7.3.10", 
  "@expo/vector-icons": "^14.1.0",
  "@react-native-async-storage/async-storage": "^1.x"
}
```

### 4. Non-Functional Requirements

#### 4.1 Performance
- アプリ起動時間: 3秒以内
- 商品追加・削除のレスポンス: 1秒以内

#### 4.2 Usability
- 直感的で分かりやすいUI
- タップしやすいボタンサイズ（44px以上）
- エラー時の分かりやすいメッセージ

### 5. Development Schedule (4-Day Plan)
- **Day 1**: プロジェクト作成、ナビゲーション設定
- **Day 2**: 商品追加機能、基本UI
- **Day 3**: リスト表示、状態管理
- **Day 4**: AsyncStorage実装、仕上げ

### 6. Future Extensions (Outside MVP Scope)
- 商品カテゴリ分類
- 商品に写真添付
- 買い物リストの共有
- 商品の並び替え
- ダークモード対応

## Development Guidelines

### Component Patterns
- Use Expo's IconSymbol component for consistent iconography
- Follow themed component pattern (ThemedText, ThemedView) for consistent styling
- Implement HapticTab for tactile feedback on tab interactions

### Styling Approach
- Use the established Colors constant for theme consistency
- Follow platform-specific styling patterns (iOS blur effects, etc.)
- Maintain 44px minimum touch target size as specified in MVP

### File Organization
- Keep screens in `app/` directory following Expo Router conventions
- Place reusable components in `components/` with appropriate subdirectories
- Use `@/` path alias for clean imports from project root

## Platform Considerations
- Target iOS and Android via Expo Go
- Web support available but mobile is primary focus
- Use Platform.select() for platform-specific styling where needed
- iOS-specific features: blur backgrounds, absolute tab bar positioning