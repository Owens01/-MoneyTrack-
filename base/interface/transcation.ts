
export interface Transaction {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
  type: "expense" | "income";
};

export interface TransactionState {
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  deleteTransaction: (id: string) => void;
}

export interface Expense {
    title: string;
    amount: string;
    category: any;
    date: string;
}