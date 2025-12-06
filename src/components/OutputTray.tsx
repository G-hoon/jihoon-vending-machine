import type { Beverage } from "@/types";

interface OutputTrayProps {
  hasItem?: boolean;
  beverage?: Beverage | null;
}

export default function OutputTray({
  hasItem = false,
  beverage,
}: OutputTrayProps) {
  return (
    <section className="mt-6 bg-gray-800 p-2 sm:p-6 rounded-xl">
      <div className="bg-gray-700/50 rounded-lg p-4 min-h-[160px] flex items-center justify-center border-2 border-dashed border-gray-600 backdrop-blur-sm">
        {hasItem && beverage ? (
          <div className="text-center animate-bounce">
            <div className="text-5xl mb-2">{beverage.emoji}</div>
            <p className="text-white text-base font-semibold">
              {beverage.name}
            </p>
            <p className="text-gray-300 text-sm mt-1">음료가 나왔습니다!</p>
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
