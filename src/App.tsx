import "./App.css";

function App() {
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
              <section className="bg-gray-900 text-green-400 p-6 rounded-xl h-32 flex items-center justify-center">
                <p className="text-xl font-mono">디스플레이 영역</p>
              </section>

              <section className="bg-gray-50 p-6 rounded-xl min-h-[300px] flex items-center justify-center">
                <p className="text-gray-400">음료 선택 영역</p>
              </section>
            </div>

            <section className="bg-gray-50 p-6 rounded-xl min-h-[400px] flex items-center justify-center">
              <p className="text-gray-400">결제 패널</p>
            </section>
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
