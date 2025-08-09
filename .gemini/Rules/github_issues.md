# GitHub Issues による実践的開発管理ガイド

##  目次
- [基本思想：Epic + 子Issue構造](#基本思想epic--子issue構造)
- [Epic Issue テンプレート](#epic-issue-テンプレート)
- [子Issue テンプレート](#子issue-テンプレート)
- [ラベル・マイルストーン管理](#ラベルマイルストーン管理)
- [GitHub CLI による効率的作成](#github-cli-による効率的作成)
- [依存関係とフロー管理](#依存関係とフロー管理)
- [実践例：買い物アプリMVP開発](#実践例買い物アプリmvp開発)

--- 

## 基本思想：Epic + 子Issue構造

###  なぜこの構造なのか
従来の「1つのIssueに全てを詰め込む」方式ではなく、**Epic（親Issue）+ 子Issue**の階層構造を採用することで：

- **進捗の可視化**: どの機能が完了し、何が残っているか一目瞭然
- **適切な粒度**: 1つの子Issueが実際の開発タスクに対応
- **分業しやすさ**: 機能ごとに担当者を割り振れる
- **モチベーション維持**: 小さなタスクを着実にクリアしていく達成感

###  推奨構造
```
 Epic Issue：プロジェクト全体管理
├── ️ 子Issue 1：基盤設定
├──  子Issue 2：UI実装
├── ⚙️ 子Issue 3：機能実装
├──  子Issue 4：データ管理
└── ✨ 子Issue 5：最終調整
```

--- 

## Epic Issue テンプレート

### 基本構造
```markdown
# 【Epic】[プロジェクト名] 開発

## 概要
このEpicは、[プロジェクト名]の開発に関するすべてのタスクを管理します。

詳細は以下を参照してください：
- [要件定義書](requirements.md)
- [技術仕様書](CLAUDE.md)

##  プロジェクトゴール
- ✅ ゴール1の具体的内容
- ✅ ゴール2の具体的内容
- ✅ ゴール3の具体的内容

##  機能要件リスト（子Issue）

### ️ 基盤設定
- [ ] #TBD [UI/Chore] プロジェクト基盤設定

###  機能実装
- [ ] #TBD [Feature] 機能A実装
- [ ] #TBD [Feature] 機能B実装

###  データ管理
- [ ] #TBD [Chore] データ永続化実装

### ✨ 最終調整
- [ ] #TBD [UI/Polish] UI調整と仕上げ

##  技術仕様
- **フレームワーク**: 使用技術
- **言語**: プログラミング言語
- **アーキテクチャ**: 設計思想

##  成功指標
- [ ] 機能要件の完全実装
- [ ] 品質要件の達成
- [ ] パフォーマンス目標の達成

##  開発フロー
各子Issueは以下の依存関係で進行します：
1. **#基盤** → 2. **#機能群** → 3. **#データ** → 4. **#調整**
```

--- 

## 子Issue テンプレート

### Feature実装用テンプレート
```markdown
##  目的 (Goal)
この機能で達成したいことを1-2行で明確に記述。

## ✅ タスクリスト (Tasks)

### UI コンポーネント実装
- [ ] コンポーネントAの作成
- [ ] レイアウトBの実装
- [ ] スタイリングの調整

### ビジネスロジック実装
- [ ] 状態管理の実装
- [ ] イベントハンドリング
- [ ] バリデーション機能

### 統合・テスト
- [ ] 他コンポーネントとの連携
- [ ] 単体テストの作成
- [ ] 動作確認

##  関連資料 (Related)
- 親Issue: #X 【Epic】プロジェクト名
- 依存Issue: #Y 前提となる機能
- 要件定義: [具体的な箇所への参照]

##  確認方法
- [ ] 基本動作の確認
- [ ] エラーケースの確認
- [ ] パフォーマンスの確認

##  完了条件 (Definition of Done)
1. ✅ 主要機能が実装されている
2. ✅ 適切なエラーハンドリング
3. ✅ TypeScript/ESLintエラーなし
4. ✅ テストが通る
5. ✅ 動作確認完了

##  実装のヒント
'''typescript
// 具体的なコード例やパターンを記載
const ExampleComponent = () => {
  // 実装の参考例
};
'''

## ⚠️ 注意事項
-実装時に注意すべき点
- 既知の制約や制限事項
```

### Chore/設定用テンプレート
```markdown
##  目的 (Goal)
設定・環境構築の目的を明確に記述。

## ✅ タスクリスト (Tasks)

### 環境設定
- [ ] 必要なライブラリのインストール
- [ ] 設定ファイルの作成・更新
- [ ] 環境変数の設定

### 確認作業
- [ ] 動作確認
- [ ] 他の機能への影響確認

##  関連資料 (Related)
- 親Issue: #X
- 技術文書: [参照先]

##  実行コマンド
'''bash
# 必要なコマンドを記載
npm install package-name
'''

##  完了条件 (Definition of Done)
1. ✅ 必要な設定が完了している
2. ✅ エラーが発生しない
3. ✅ 後続作業の準備が整っている
```

--- 

## ラベル・マイルストーン管理

### 推奨ラベル体系
```bash
# 優先度ラベル
priority: critical  # 緊急対応（赤）
priority: high      # 高優先度（オレンジ）
priority: medium    # 中優先度（黄）
priority: low       # 低優先度（緑）

# 種別ラベル
epic        # Epic Issue（紫）
feature     # 新機能実装（緑）
ui          # UI/UX関連（オレンジ）
chore       # 設定・メンテナンス（グレー）
bug         # バグ修正（赤）

# 状態ラベル
in-progress # 作業中（黄）
testing     # テスト中（青）
blocked     # ブロック状態（赤）

# 技術領域ラベル
frontend    # フロントエンド（ピンク）
backend     # バックエンド（青）
database    # データベース（紫）
```

### マイルストーン設定例
- **MVP リリース**: 最小機能での初回リリース
- **v1.0 リリース**: 正式版リリース
- **機能拡張フェーズ**: 追加機能開発

### GitHub CLIでのラベル作成
'''bash
# 一括でラベルを作成
gh label create "priority: high" --color "ff9500" --description "高優先度"
gh label create "epic" --color "8B5CF6" --description "大きな機能をまとめる親Issue"
gh label create "feature" --color "10B981" --description "新機能の実装"
gh label create "ui" --color "F59E0B" --description "UIコンポーネントやレイアウト"
'''

--- 

## GitHub CLI による効率的作成

### Epic Issue作成
'''bash
gh issue create \
  --title "【Epic】プロジェクト名 開発" \
  --body "$(cat epic_template.md)" \
  --milestone "MVP リリース" \
  --label "epic,priority: high"
'''

### 子Issue一括作成スクリプト例
'''bash
#!/bin/bash
# create_child_issues.sh

MILESTONE="MVP リリース"
EPIC_NUMBER=6

# 基盤設定Issue
gh issue create \
  --title "[UI/Chore] プロジェクト基盤設定" \
  --body "$(cat templates/setup_issue.md)" \
  --milestone "$MILESTONE" \
  --label "ui,chore,priority: high"

# 機能実装Issue
gh issue create \
  --title "[Feature] 主要機能の実装" \
  --body "$(cat templates/feature_issue.md)" \
  --milestone "$MILESTONE" \
  --label "feature,priority: high"
'''

### Issueの関連付け
'''bash
# Epic IssueのBodyを更新して子Issueを参照
gh issue edit $EPIC_NUMBER --body "$(cat updated_epic_body.md)"
'''

--- 

## 依存関係とフロー管理

### 依存関係の明示方法
1. **Epic Issue内**でチェックリスト形式で管理
2. **子Issue**で「依存Issue」として明記
3. **開発フロー図**で視覚的に表現

### フロー例
```
Phase 1: 基盤設定
└── #7 [UI/Chore] プロジェクト設定
    ↓
Phase 2: 並行開発可能
├── #8 [Feature] 機能A実装
└── #9 [Feature] 機能B実装
    ↓
Phase 3: 統合作業
├── #10 [Feature] 機能C実装（A,B依存）
└── #11 [Chore] データ永続化
    ↓
Phase 4: 最終調整
└── #12 [UI/Polish] UI調整と仕上げ
```

### 依存関係チェック
- 各子Issueに「依存Issue: #X」を明記
- Epic Issueで全体フローを管理
- ブロッカーが発生した場合は即座に報告

--- 

## 実践例：買い物アプリMVP開発

### Epic Issue (#6)
```markdown
# 【Epic】買い物リストアプリ MVP開発

##  機能要件リスト（子Issue）
- [ ] #7 [UI/Chore] プロジェクト基盤設定とタブナビゲーション
- [ ] #8 [Feature/UI] 商品追加機能の実装
- [ ] #9 [Feature/UI] 商品リスト表示機能の実装
- [ ] #10 [Feature] 商品購入状態管理機能の実装
- [ ] #11 [Feature] 商品削除機能の実装
- [ ] #12 [Chore] AsyncStorageによるデータ永続化の実装
- [ ] #13 [UI/Polish] UIの微調整と全体的な仕上げ

##  開発フロー
1. **#7** → 2. **#8, #9** → 3. **#10, #11** → 4. **#12** → 5. **#13**
```

### 子Issue例 (#8)
```markdown
##  目的 (Goal)
ユーザーが商品名を入力してリストに追加できる機能を実装する。

## ✅ タスクリスト (Tasks)
### UI コンポーネントの実装
- [ ] 商品名入力用の`TextInput`を配置
- [ ] 「追加」ボタンを配置
- [ ] レイアウトの調整

### 状態管理の実装
- [ ] 入力内容を管理する`useState`の実装
- [ ] 商品追加関数の実装

##  関連資料 (Related)
- 親Issue: #6 【Epic】買い物リストアプリ MVP開発
- 依存Issue: #7 プロジェクト基盤設定とタブナビゲーション

##  実装のヒント
'''typescript
const addItem = () => {
  if (itemName.trim()) {
    const newItem: ShoppingItem = {
      id: generateUniqueId(),
      name: itemName.trim(),
      isCompleted: false,
      createdAt: new Date()
    };
    setItems([...items, newItem]);
    setItemName('');
  }
};
'''
```

--- 

## ベストプラクティス

### Issue作成時
1. **明確で具体的なタイトル**: 何をするのかが一目でわかる
2. **適切な粒度**: 1週間以内で完了できるサイズ
3. **具体的なタスクリスト**: チェックボックス形式で細分化
4. **実装ヒント**: コード例やパターンを含める
5. **完了条件**: 何をもって完了とするかを明確化

### Issue管理時
1. **定期的な進捗更新**: 最低でも日次で状況報告
2. **ブロッカーの即座共有**: 困ったらすぐに相談
3. **Epic Issueの継続更新**: 子Issueの完了に合わせてチェック
4. **ラベルの適切な活用**: 状況に応じてラベルを更新

### 完了時
1. **詳細な完了報告**: 何を実装したかを具体的に記録
2. **動作確認の証跡**: スクリーンショットや動作動画
3. **次のIssueへの引き継ぎ**: 注意点や改善点を記録
4. **学習の記録**: 得られた知見や課題を文書化

--- 

## チェックリスト

### Epic Issue作成時
- [ ] プロジェクト全体のゴールが明確
- [ ] 子Issueの一覧が整理されている
- [ ] 依存関係が明示されている
- [ ] 技術仕様が記載されている
- [ ] 成功指標が設定されている

### 子Issue作成時
- [ ] 目的が1-2行で明確に記述されている
- [ ] タスクリストが具体的で実行可能
- [ ] 関連資料への参照が設定されている
- [ ] 完了条件が明確に定義されている
- [ ] 実装ヒントが含まれている

### Issue管理中
- [ ] 進捗が定期的に更新されている
- [ ] ブロッカーが即座に共有されている
- [ ] Epic Issueが最新状態に保たれている
- [ ] 適切なラベルが付与されている

### 完了時
- [ ] 完了条件がすべて満たされている
- [ ] 動作確認が完了している
- [ ] 完了報告が詳細に記録されている
- [ ] 次への引き継ぎ事項が明確

--- 

このガイドに従うことで、GitHub Issuesを使った効率的で透明性の高い開発管理が実現できます。重要なのは、**理論よりも実践**、**抽象的な記述よりも具体的な行動**を重視することです。