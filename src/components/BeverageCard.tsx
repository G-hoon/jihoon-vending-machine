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
  const isLowStock = beverage.stock > 0 && beverage.stock <= 3;
  const stockTextClassName = `text-xs font-medium
  ${
    isOutOfStock
      ? "text-red-500"
      : isLowStock
      ? "text-orange-500"
      : "text-gray-500"
  }`;

  return (
    <button
      onClick={onSelect}
      disabled={isOutOfStock}
      className={`
        relative bg-white p-5 rounded-xl shadow-md transition-all duration-300
        ${
          isOutOfStock
            ? "opacity-50 cursor-not-allowed grayscale"
            : "hover:shadow-xl hover:-translate-y-2 active:scale-95"
        }
      `}
    >
      {isOutOfStock && (
        <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
          품절
        </div>
      )}

      <div className="text-center space-y-3">
        <div className="text-5xl">{beverage.emoji}</div>

        <h3 className="font-bold text-lg text-gray-800">{beverage.name}</h3>

        <div className="bg-gray-800 text-white py-2 px-3 rounded-lg">
          <p className="text-sm font-bold">
            {beverage.price.toLocaleString()}원
          </p>
        </div>

        <p className={stockTextClassName}>
          {isOutOfStock ? "재고 없음" : `재고 ${beverage.stock}개`}
        </p>
      </div>
    </button>
  );
}
