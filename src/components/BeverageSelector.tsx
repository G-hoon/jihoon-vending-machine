import type { Beverage, BeverageId } from "@/types";
import BeverageCard from "@/components/BeverageCard";

interface BeverageSelectorProps {
  beverages: Beverage[];
  onSelect: (id: BeverageId) => void;
}

export default function BeverageSelector({
  beverages,
  onSelect,
}: BeverageSelectorProps) {
  return (
    <section className="bg-gray-50 p-2 sm:p-6 rounded-xl shadow-inner">
      <h2 className="text-xl font-bold mb-4 text-gray-700">음료 선택</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {beverages.map((beverage) => (
          <BeverageCard
            key={beverage.id}
            beverage={beverage}
            onSelect={() => onSelect(beverage.id)}
          />
        ))}
      </div>
    </section>
  );
}
