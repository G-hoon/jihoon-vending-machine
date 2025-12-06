import type { CashUnit } from "@/types";

interface CashButtonProps {
  amount: CashUnit;
  onClick: () => void;
}

export default function CashButton({ amount, onClick }: CashButtonProps) {
  return (
    <button
      onClick={onClick}
      className="bg-white py-3 px-4 rounded-lg shadow hover:shadow-md hover:scale-105 transition-all text-gray-800 font-semibold active:scale-95"
    >
      {amount.toLocaleString()}원
    </button>
  );
}
