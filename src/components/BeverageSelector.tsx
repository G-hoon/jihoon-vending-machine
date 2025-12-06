import type { Beverage, BeverageId } from "@/types";

interface BeverageSelectorProps {
  beverages: Beverage[];
  onSelect: (id: BeverageId) => void;
}

export default function BeverageSelector({
  beverages,
  onSelect,
}: BeverageSelectorProps) {
  return (
    <section className="bg-gray-50 p-6 rounded-xl">
      <h2 className="text-lg font-semibold mb-4 text-gray-700">음료 선택</h2>

      <div className="grid grid-cols-3 gap-4">
        {beverages.map((beverage) => (
          <button
            key={beverage.id}
            onClick={() => onSelect(beverage.id)}
            className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <div className="text-center space-y-2">
              <div className="text-4xl">🥤</div>
              <h3 className="font-semibold text-gray-800">{beverage.name}</h3>
              <p className="text-sm text-gray-600">
                {beverage.price.toLocaleString()}원
              </p>
              <p className="text-xs text-gray-500">재고: {beverage.stock}개</p>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
