import type { Beverage } from "@/types";

interface CardPaymentModalProps {
  isOpen: boolean;
  beverage: Beverage | null;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function CardPaymentModal({
  isOpen,
  beverage,
  onConfirm,
  onCancel,
}: CardPaymentModalProps) {
  if (!isOpen || !beverage) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onCancel}
      />

      {/* Modal 컨텐츠 */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-scale-in">
        {/* 헤더 */}
        <div className="text-center mb-6">
          <div className="text-6xl mb-4">{beverage.emoji}</div>
          <h2 className="text-2xl font-bold text-gray-800">카드 결제</h2>
        </div>

        {/* 결제 정보 */}
        <div className="bg-gray-50 rounded-xl p-4 mb-6 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">상품명</span>
            <span className="font-semibold text-gray-800">{beverage.name}</span>
          </div>
          <div className="border-t border-gray-200 pt-3 flex justify-between items-center">
            <span className="text-gray-600">결제 금액</span>
            <span className="text-2xl font-bold text-blue-600">
              {beverage.price.toLocaleString()}원
            </span>
          </div>
        </div>

        {/* 버튼 */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={onCancel}
            className="py-3 px-4 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 active:scale-95 transition-all"
          >
            취소
          </button>
          <button
            onClick={onConfirm}
            className="py-3 px-4 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 active:scale-95 transition-all"
          >
            결제하기
          </button>
        </div>
      </div>
    </div>
  );
}
