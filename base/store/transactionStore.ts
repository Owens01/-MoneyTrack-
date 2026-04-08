import { recentTransactions } from "@/components/constants/homeMockData";
import { create } from "zustand";
import { TransactionState } from "../interface/transcation";

export const useTransactionStore = create<TransactionState>((set) => ({
  transactions: recentTransactions,
  addTransaction: (newTransaction) =>
    set((state) => ({
      transactions: [
        {
          ...newTransaction,
          id: Math.random().toString(36).substring(2, 9),
        },
        ...state.transactions,
      ],
    })),
  deleteTransaction: (id) =>
    set((state) => ({
      transactions: state.transactions.filter((t) => t.id !== id),
    })),
}));
