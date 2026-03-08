import { Transaction } from "@/components/TransactionHistory";

export const downloadReceipt = (transaction: Transaction) => {
  const now = transaction.timestamp;
  const dateStr = now.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
  const timeStr = now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit" });

  const lines = [
    "========================================",
    "         VIRTUAL CASH MACHINE          ",
    "         Transaction Receipt           ",
    "========================================",
    "",
    `Date     : ${dateStr}`,
    `Time     : ${timeStr}`,
    `Txn ID   : TXN${String(transaction.id).padStart(6, "0")}`,
    "",
    "----------------------------------------",
    `Type     : ${transaction.type.toUpperCase()}`,
    ...(transaction.amount ? [`Amount   : Rs. ${transaction.amount.toFixed(2)}`] : []),
    `Balance  : Rs. ${transaction.balance.toFixed(2)}`,
    "----------------------------------------",
    "",
    "Thank you for using Virtual Cash Machine",
    "========================================",
  ];

  const content = lines.join("\n");
  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `receipt_TXN${String(transaction.id).padStart(6, "0")}.txt`;
  a.click();
  URL.revokeObjectURL(url);
};
