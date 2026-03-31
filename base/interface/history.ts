export type CategoryType =
  | "Food"
  | "Transport"
  | "Data"
  | "Rent"
  | "School Fees"
  | "Shopping"
  | "Other";

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  category: CategoryType;
  date: string;
}
