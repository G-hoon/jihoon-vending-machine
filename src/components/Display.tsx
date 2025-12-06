interface DisplayProps {
  balance: number;
  message: string;
}

export default function Display({ balance, message }: DisplayProps) {
  return (
    <section className="bg-gray-900 text-green-400 p-6 rounded-xl h-32 font-mono">
      <div className="flex flex-col justify-between h-full">
        {/* 잔액 표시 */}
        <div className="flex justify-between items-center">
          <span className="text-sm">잔액</span>
          <span className="text-2xl font-bold">
            {balance.toLocaleString()}원
          </span>
        </div>

        {/* 메시지 표시 */}
        <div className="text-center">
          <p className="text-sm">{message}</p>
        </div>
      </div>
    </section>
  );
}
