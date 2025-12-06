import type { Beverage, BeverageId, CashUnit, Change } from "@/types";

/**
 * 사용 가능한 현금 단위 배열
 */
export const CASH_UNITS: CashUnit[] = [100, 500, 1000, 5000, 10000];

/**
 * 초기 음료 데이터
 */
export const INITIAL_BEVERAGES: Record<BeverageId, Beverage> = {
  cola: {
    id: "cola",
    name: "콜라",
    price: 1100,
    stock: 10,
    emoji: "🥤",
  },
  water: {
    id: "water",
    name: "물",
    price: 600,
    stock: 10,
    emoji: "💧",
  },
  coffee: {
    id: "coffee",
    name: "커피",
    price: 700,
    stock: 10,
    emoji: "☕",
  },
};

/**
 * 초기 거스름돈 재고
 */
export const INITIAL_CHANGE_STOCK: Change = {
  100: 10,
  500: 10,
  1000: 10,
  5000: 5,
  10000: 2,
};

/**
 * 빈 거스름돈 (초기화용)
 */
export const EMPTY_CHANGE: Change = {
  100: 0,
  500: 0,
  1000: 0,
  5000: 0,
  10000: 0,
};
