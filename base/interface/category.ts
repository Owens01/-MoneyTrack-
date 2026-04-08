import { Expense } from "./transcation";

export type CategoryType =
  | "Food"
  | "Transport"
  | "Data"
  | "Rent"
  | "School Fees"
  | "Shopping"
  | "Other";

export interface AddExpenseModalProps {
  onSave: (expense: Expense) => void;
}
