import { useState } from "react";
import type { Beverage } from "@/types";

export function useCardPayment() {
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);
  const [selectedBeverage, setSelectedBeverage] = useState<Beverage | null>(
    null
  );

  const openModal = (beverage: Beverage) => {
    setSelectedBeverage(beverage);
    setIsCardModalOpen(true);
  };

  const closeModal = () => {
    setIsCardModalOpen(false);
    setSelectedBeverage(null);
  };

  return {
    isCardModalOpen,
    selectedBeverage,
    openModal,
    closeModal,
  };
}
