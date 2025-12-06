import {
  BeverageSelector,
  Display,
  OutputTray,
  PaymentPanel,
} from "@/components";
import { INITIAL_BEVERAGES } from "@/constants";
import type { Beverage, BeverageId, CashUnit } from "@/types";
import { useState } from "react";
import "./App.css";

function App() {
  const [balance, setBalance] = useState(0);
  const [message, setMessage] = useState(
    "음료를 선택하신 후 금액을 투입해주세요"
  );
  const [beverages, setBeverages] =
    useState<Record<BeverageId, Beverage>>(INITIAL_BEVERAGES);
  const [dispensedBeverage, setDispensedBeverage] = useState<Beverage | null>(
    null
  );

  // 현금 투입
  const handleCashInsert = (amount: CashUnit) => {
    setDispensedBeverage(null); // 출력구 리셋
    setBalance((prev) => prev + amount);
    setMessage(`${amount}원이 투입되었습니다. 잔액: ${balance + amount}원`);
  };

  // 음료 선택 및 구매
  const handleBeverageSelect = (id: BeverageId) => {
    setDispensedBeverage(null); // 출력구 리셋

    const beverage = beverages[id];

    if (!beverage) {
      setMessage("존재하지 않는 음료입니다");
      return;
    }

    if (beverage.stock === 0) {
      setMessage("해당 음료의 재고가 없습니다");
      return;
    }

    if (balance < beverage.price) {
      setMessage(
        `잔액이 부족합니다. ${beverage.price - balance}원이 더 필요합니다`
      );
      return;
    }

    // 구매 처리
    const remainingBalance = balance - beverage.price;

    // 재고 차감
    setBeverages((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        stock: prev[id].stock - 1,
      },
    }));

    // 음료 배출
    setDispensedBeverage(beverage);
    setBalance(remainingBalance);
    setMessage(
      remainingBalance > 0
        ? `구매 완료! 잔액: ${remainingBalance}원`
        : "구매 완료!"
    );
  };

  // 취소/반환
  const handleCancel = () => {
    if (balance === 0) {
      setMessage("반환할 금액이 없습니다");
      return;
    }

    const refundAmount = balance;
    setBalance(0);
    setDispensedBeverage(null);
    setMessage(`${refundAmount}원이 반환되었습니다`);
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
            <div className="lg:col-span-2 space-y-6">
              <Display balance={balance} message={message} />
              <BeverageSelector
                beverages={Object.values(beverages)}
                onSelect={handleBeverageSelect}
              />
            </div>

            <PaymentPanel
              onCashInsert={handleCashInsert}
              onCancel={handleCancel}
            />
          </div>

          <OutputTray
            hasItem={!!dispensedBeverage}
            beverage={dispensedBeverage}
          />
        </main>
      </div>
    </div>
  );
}

export default App;
