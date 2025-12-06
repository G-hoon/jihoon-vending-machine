// 음료 ID
export type BeverageId = "cola" | "water" | "coffee";

// 현금 단위
export type CashUnit = 100 | 500 | 1000 | 5000 | 10000;

// 음료 정보
export interface Beverage {
  id: BeverageId;
  name: string;
  price: number;
  stock: number;
  emoji: string;
}

// 거스름돈 재고
export type Change = {
  [key in CashUnit]: number;
};
