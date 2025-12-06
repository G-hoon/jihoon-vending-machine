import {
  BeverageSelector,
  Display,
  OutputTray,
  PaymentPanel,
} from "@/components";
import type { BeverageId, CashUnit } from "@/types";
import "./App.css";
import { useBeverageManagement, useOutputTray, usePayment } from "./hooks";

function App() {
  const payment = usePayment();
  const beverageManagement = useBeverageManagement();
  const outputTray = useOutputTray();

  const handleCashInsert = (amount: CashUnit) => {
    outputTray.clear();
    payment.insertCash(amount);
  };

  const handleBeverageSelect = (id: BeverageId) => {
    outputTray.clear();

    // 구매 가능 여부 검증
    const validation = beverageManagement.validatePurchase(id, payment.balance);
    if (!validation.valid) {
      payment.updateMessage(validation.error!);
      return;
    }

    // 음료 구매
    const beverage = beverageManagement.purchaseBeverage(id);
    if (!beverage) return;

    // 잔액 차감
    const success = payment.deductBalance(beverage.price);
    if (!success) return;

    // 음료 배출
    outputTray.dispense(beverage);

    // 메시지 업데이트
    const remainingBalance = payment.balance;
    payment.updateMessage(
      remainingBalance > 0
        ? `구매 완료! 잔액: ${remainingBalance}원`
        : "구매 완료!"
    );
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
      <div className="w-full max-w-4xl bg-white rounded-3xl">
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
    </div>
  );
}

export default App;
