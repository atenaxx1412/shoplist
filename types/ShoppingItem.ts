/**
 * Shopping List Item Type Definition
 * 買い物リストの商品アイテムの型定義
 */

export interface ShoppingItem {
  /** 一意識別子 (UUID) */
  id: string;
  
  /** 商品名 */
  name: string;
  
  /** 購入済みフラグ */
  isCompleted: boolean;
  
  /** 作成日時 */
  createdAt: Date;
}

/**
 * AsyncStorage用のShoppingItemデータ型
 * DateをISO文字列として保存するため
 */
export interface StoredShoppingItem {
  id: string;
  name: string;
  isCompleted: boolean;
  createdAt: string; // ISO文字列として保存
}

/**
 * 商品追加時の入力データ型
 */
export interface AddShoppingItemInput {
  name: string;
}

/**
 * 商品リスト操作のアクション型
 */
export type ShoppingListAction = 
  | { type: 'ADD_ITEM'; payload: ShoppingItem }
  | { type: 'TOGGLE_ITEM'; payload: string } // id
  | { type: 'DELETE_ITEM'; payload: string } // id
  | { type: 'LOAD_ITEMS'; payload: ShoppingItem[] }
  | { type: 'CLEAR_ITEMS' };