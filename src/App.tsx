import "./App.css";
import { INITIAL_BEVERAGES } from "./constants";
import type { BeverageId, CashUnit } from "./types";
import { Display, BeverageSelector, PaymentPanel } from "@/components";

function App() {
  // 임시 데이터
  const balance = 0;
  const message = "음료를 선택하신 후 금액을 투입해주세요";
  const beverages = Object.values(INITIAL_BEVERAGES);

  // 임시
  const handleBeverageSelect = (id: BeverageId) => {
    console.log("선택한 음료:", id);
  };

  const handleCashInsert = (amount: CashUnit) => {
    console.log("투입한 금액:", amount);
  };

  const handleCancel = () => {
    console.log("취소");
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
        <main className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Display balance={balance} message={message} />
              <BeverageSelector
                beverages={beverages}
                onSelect={handleBeverageSelect}
              />
            </div>

            <PaymentPanel
              onCashInsert={handleCashInsert}
              onCancel={handleCancel}
            />
          </div>

          {/* 하단: 출력구 */}
          <section className="mt-6 bg-gray-800 text-white py-4 rounded-xl text-center">
            <p className="text-sm font-semibold">출력구</p>
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;
