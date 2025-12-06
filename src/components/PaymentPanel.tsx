import type { CashUnit } from "@/types";
import { CASH_UNITS } from "@/constants";
import CashButton from "@/components/CashButton";

interface PaymentPanelProps {
  onCashInsert: (amount: CashUnit) => void;
  onCancel: () => void;
}

export default function PaymentPanel({
  onCashInsert,
  onCancel,
}: PaymentPanelProps) {
  return (
    <section className="bg-gray-50 p-2 sm:p-6 rounded-xl">
      <h2 className="text-lg font-semibold mb-4 text-gray-700">결제</h2>

      <div className="space-y-4">
        {/* 현금 투입 */}
        <div>
          <h3 className="text-sm font-medium text-gray-600 mb-2">현금 투입</h3>
          <div className="grid grid-cols-2 gap-2">
            {CASH_UNITS.map((unit) => (
              <CashButton
                key={unit}
                amount={unit}
                onClick={() => onCashInsert(unit)}
              />
            ))}
          </div>
        </div>

        {/* 취소 버튼 */}
        <button
          onClick={onCancel}
          className="w-full bg-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-400 transition-colors font-semibold"
        >
          취소 / 반환
        </button>
      </div>
    </section>
  );
}
