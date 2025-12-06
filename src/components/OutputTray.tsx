interface OutputTrayProps {
  hasItem?: boolean;
}

export default function OutputTray({ hasItem = false }: OutputTrayProps) {
  return (
    <section className="mt-6 bg-gray-800 p-6 rounded-xl">
      <div className="bg-gray-700 rounded-lg p-4 min-h-[80px] flex items-center justify-center border-2 border-dashed border-gray-600">
        {hasItem ? (
          <div className="text-center">
            <div className="text-4xl mb-2">🥤</div>
            <p className="text-white text-sm">음료가 나왔습니다</p>
          </div>
        ) : (
          <p className="text-gray-500 font-semibold text-sm">출력구</p>
        )}
      </div>
    </section>
  );
}
