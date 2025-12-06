interface OutputTrayProps {
  hasItem?: boolean;
}

export default function OutputTray({ hasItem = false }: OutputTrayProps) {
  return (
    <section className="mt-6 bg-gray-800 p-6 rounded-xl">
      <div className="bg-gray-700/50 rounded-lg p-6 min-h-[100px] flex items-center justify-center border-2 border-dashed border-gray-600">
        {hasItem ? (
          <div className="text-center animate-bounce">
            <div className="text-5xl mb-2">🥤</div>
            <p className="text-white text-sm font-semibold">
              음료가 나왔습니다!
            </p>
            <p className="text-gray-400 text-xs mt-1">받아가세요</p>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-gray-500 text-sm font-medium">출력구</p>
            <p className="text-gray-600 text-xs mt-1">OUTPUT TRAY</p>
          </div>
        )}
      </div>
    </section>
  );
}
