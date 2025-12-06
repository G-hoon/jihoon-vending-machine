import { useState } from "react";
import type { Beverage } from "@/types";

export function useOutputTray() {
  const [dispensedBeverage, setDispensedBeverage] = useState<Beverage | null>(
    null
  );

  const dispense = (beverage: Beverage) => {
    setDispensedBeverage(beverage);
  };

  const clear = () => {
    setDispensedBeverage(null);
  };

  return {
    dispensedBeverage,
    dispense,
    clear,
  };
}
