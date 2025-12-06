import {
  BeverageSelector,
  CardPaymentModal,
  Display,
  OutputTray,
  PaymentPanel,
} from "@/components";
import type { BeverageId, CashUnit } from "@/types";
import type { PaymentMethod } from "@/hooks/usePayment";
import "./App.css";
import {
  useBeverageManagement,
  useCardPayment,
  useOutputTray,
  usePayment,
} from "./hooks";

function App() {
  const payment = usePayment();
  const beverageManagement = useBeverageManagement();
  const outputTray = useOutputTray();
  const cardPayment = useCardPayment();

  const handlePaymentMethodChange = (method: PaymentMethod) => {
    payment.changePaymentMethod(method);
  };

  const handleCashInsert = (amount: CashUnit) => {
    outputTray.clear();
    payment.insertCash(amount);
  };

  const handleBeverageSelect = (id: BeverageId) => {
    outputTray.clear();

    const beverage = beverageManagement.beverages.find((b) => b.id === id);
    if (!beverage) {
      payment.updateMessage("존재하지 않는 음료입니다");
      return;
    }

    if (beverage.stock === 0) {
      payment.updateMessage("해당 음료의 재고가 없습니다");
      return;
    }

    // 카드 결제 모드일 때
    if (payment.paymentMethod === "card") {
      cardPayment.openModal(beverage);
      return;
    }

    // 현금 결제 모드일 때
    if (payment.balance < beverage.price) {
      payment.updateMessage(
        `잔액이 부족합니다. ${
          beverage.price - payment.balance
        }원이 더 필요합니다`
      );
      return;
    }

    // 음료 구매
    const purchasedBeverage = beverageManagement.purchaseBeverage(id);
    if (!purchasedBeverage) return;

    // 잔액 차감 전에 남은 금액 계산
    const remainingBalance = payment.balance - beverage.price;

    // 잔액 차감
    const success = payment.deductBalance(beverage.price);
    if (!success) return;

    // 음료 배출
    outputTray.dispense(purchasedBeverage);

    // 메시지 업데이트
    payment.updateMessage(
      remainingBalance > 0
        ? `구매 완료! 잔액: ${remainingBalance}원`
        : "구매 완료!"
    );
  };

  const handleCardPaymentConfirm = () => {
    if (!cardPayment.selectedBeverage) return;

    // 재고 차감
    const beverage = beverageManagement.purchaseBeverage(
      cardPayment.selectedBeverage.id
    );
    if (!beverage) return;

    // 음료 배출
    outputTray.dispense(beverage);

    // 메시지 업데이트
    payment.updateMessage("카드 결제 완료!");

    // 상태 초기화
    cardPayment.closeModal();
  };

  const handleCardPaymentCancel = () => {
    cardPayment.closeModal();
    payment.updateMessage("카드 결제가 취소되었습니다");
  };

  const handleCancel = () => {
    const refunded = payment.refund();
    if (refunded !== null) {
      outputTray.clear();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {/* 자판기 컨테이너 */}
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl">
        {/* 자판기 헤더 */}
        <header className="bg-gray-800 text-white py-4 text-center rounded-t-3xl">
          <h1 className="text-3xl font-bold">자판기</h1>
          <span className="text-sm mt-1 text-gray-300">Vending Machine</span>
        </header>

        {/* 메인 컨텐츠 영역 */}
        <main className="p-4 sm:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6 order-2 lg:order-1">
              <Display balance={payment.balance} message={payment.message} />
              <BeverageSelector
                beverages={beverageManagement.beverages}
                onSelect={handleBeverageSelect}
              />
            </div>
            <div className="order-1 lg:order-2">
              <PaymentPanel
                paymentMethod={payment.paymentMethod}
                onPaymentMethodChange={handlePaymentMethodChange}
                onCashInsert={handleCashInsert}
                onCancel={handleCancel}
              />
            </div>
          </div>

          <OutputTray
            hasItem={!!outputTray.dispensedBeverage}
            beverage={outputTray.dispensedBeverage}
          />
        </main>
      </div>

      {/* 카드 결제 모달 */}
      <CardPaymentModal
        isOpen={cardPayment.isCardModalOpen}
        beverage={cardPayment.selectedBeverage}
        onConfirm={handleCardPaymentConfirm}
        onCancel={handleCardPaymentCancel}
      />
    </div>
  );
}

export default App;
