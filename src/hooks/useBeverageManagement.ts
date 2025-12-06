import { useState } from "react";
import { INITIAL_BEVERAGES } from "@/constants";
import type { Beverage, BeverageId } from "@/types";

interface ValidationResult {
  valid: boolean;
  error?: string;
}

export function useBeverageManagement() {
  const [beverages, setBeverages] =
    useState<Record<BeverageId, Beverage>>(INITIAL_BEVERAGES);

  // 구매 가능 여부 검증
  const validatePurchase = (
    id: BeverageId,
    balance: number
  ): ValidationResult => {
    const beverage = beverages[id];

    if (!beverage) {
      return { valid: false, error: "존재하지 않는 음료입니다" };
    }

    if (beverage.stock === 0) {
      return { valid: false, error: "해당 음료의 재고가 없습니다" };
    }

    if (balance < beverage.price) {
      return {
        valid: false,
        error: `잔액이 부족합니다. ${
          beverage.price - balance
        }원이 더 필요합니다`,
      };
    }

    return { valid: true };
  };

  const purchaseBeverage = (id: BeverageId): Beverage | null => {
    const beverage = beverages[id];
    if (!beverage) return null;

    // 재고 차감
    setBeverages((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        stock: prev[id].stock - 1,
      },
    }));

    return beverage;
  };

  return {
    beverages: Object.values(beverages),
    validatePurchase,
    purchaseBeverage,
  };
}
