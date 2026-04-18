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

export interface HorizontalSelectorProps {
  data: string[];
  selected: string;
  onSelect: (item: string) => void;
  keyExtractor?: (item: string, index: number) => string;
  labelExtractor?: (item: string) => string;
  contentStyle?: string;
}
