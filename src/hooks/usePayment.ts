import { useState } from "react";
import type { CashUnit } from "@/types";

export type PaymentMethod = "cash" | "card";

export function usePayment() {
  const [balance, setBalance] = useState(0);
  const [message, setMessage] = useState(
    "음료를 선택하신 후 금액을 투입해주세요"
  );
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cash");

  const changePaymentMethod = (method: PaymentMethod) => {
    setPaymentMethod(method);
    if (method === "card") {
      setMessage("카드로 결제할 음료를 선택해주세요");
    } else {
      setMessage(
        balance > 0
          ? `현재 잔액: ${balance}원`
          : "음료를 선택하신 후 금액을 투입해주세요"
      );
    }
  };

  const insertCash = (amount: CashUnit) => {
    setBalance((prev) => {
      const newBalance = prev + amount;
      setMessage(`${amount}원이 투입되었습니다. 잔액: ${newBalance}원`);
      return newBalance;
    });
  };

  const deductBalance = (amount: number) => {
    if (balance < amount) {
      return false;
    }
    setBalance((prev) => prev - amount);
    return true;
  };

  const refund = () => {
    if (balance === 0) {
      setMessage("반환할 금액이 없습니다");
      return null;
    }

    const refundAmount = balance;
    setBalance(0);
    setMessage(`${refundAmount}원이 반환되었습니다`);
    return refundAmount;
  };

  const updateMessage = (msg: string) => {
    setMessage(msg);
  };

  return {
    balance,
    message,
    paymentMethod,
    changePaymentMethod,
    insertCash,
    deductBalance,
    refund,
    updateMessage,
  };
}
