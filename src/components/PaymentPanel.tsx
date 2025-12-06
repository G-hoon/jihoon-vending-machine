import type { CashUnit } from "@/types";
import { CASH_UNITS } from "@/constants";
import CashButton from "@/components/CashButton";

type PaymentMethod = "cash" | "card";

interface PaymentPanelProps {
  paymentMethod: PaymentMethod;
  onPaymentMethodChange: (method: PaymentMethod) => void;
  onCashInsert: (amount: CashUnit) => void;
  onCancel: () => void;
}

export default function PaymentPanel({
  paymentMethod,
  onPaymentMethodChange,
  onCashInsert,
  onCancel,
}: PaymentPanelProps) {
  return (
    <section className="bg-gray-100 p-6 rounded-xl shadow-inner">
      <h2 className="text-xl font-bold mb-5 text-gray-800 flex items-center gap-2">
        <span className="text-2xl">💳</span>
        결제 수단 선택
      </h2>

      <div className="space-y-5">
        {/* 결제 수단 토글 (Tab 방식) */}
        <div className="bg-gray-200 p-1 rounded-lg grid grid-cols-2 gap-1">
          <button
            onClick={() => onPaymentMethodChange("cash")}
            className={`py-2.5 px-4 rounded-md font-semibold transition-all ${
              paymentMethod === "cash"
                ? "bg-white text-gray-800 shadow-md"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            💵 현금
          </button>
          <button
            onClick={() => onPaymentMethodChange("card")}
            className={`py-2.5 px-4 rounded-md font-semibold transition-all ${
              paymentMethod === "card"
                ? "bg-white text-gray-800 shadow-md"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            💳 카드
          </button>
        </div>

        {/* 현금 투입 (현금 모드일 때만 표시) */}
        {paymentMethod === "cash" && (
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">
              현금 투입
            </h3>
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
        )}

        {/* 카드 결제 안내 (카드 모드일 때만 표시) */}
        {paymentMethod === "card" && (
          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl">ℹ️</span>
              <div>
                <p className="text-sm font-semibold text-blue-800 mb-1">
                  카드 결제 모드
                </p>
                <p className="text-xs text-blue-600">
                  원하시는 음료를 선택하면 결제 확인 창이 표시됩니다.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 구분선 */}
        <div className="border-t border-gray-300 pt-4">
          {/* 취소 버튼 */}
          <button
            onClick={onCancel}
            className="w-full bg-gray-400 text-white py-3 px-4 rounded-lg hover:bg-gray-500 transition-all duration-200 font-bold"
          >
            ↩️ 취소 / 반환
          </button>
        </div>
      </div>
    </section>
  );
}
