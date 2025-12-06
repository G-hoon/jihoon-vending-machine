import type { Beverage } from "@/types";

interface BeverageCardProps {
  beverage: Beverage;
  onSelect: () => void;
}

export default function BeverageCard({
  beverage,
  onSelect,
}: BeverageCardProps) {
  const isOutOfStock = beverage.stock === 0;

  return (
    <button
      onClick={onSelect}
      disabled={isOutOfStock}
      className={`
        bg-white p-4 rounded-lg shadow transition-all
        ${
          isOutOfStock
            ? "opacity-50 cursor-not-allowed"
            : "hover:shadow-md hover:-translate-y-1"
        }
      `}
    >
      <div className="text-center space-y-2">
        <div className="text-4xl">🥤</div>
        <h3 className="font-semibold text-gray-800">{beverage.name}</h3>
        <p className="text-sm text-gray-600">
          {beverage.price.toLocaleString()}원
        </p>
        <p
          className={`text-xs ${
            isOutOfStock ? "text-red-500 font-semibold" : "text-gray-500"
          }`}
        >
          {isOutOfStock ? "품절" : `재고: ${beverage.stock}개`}
        </p>
      </div>
    </button>
  );
}
