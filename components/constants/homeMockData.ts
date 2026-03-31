import { Transaction } from "../../base/interface/transcation";

export const recentTransactions: Transaction[] = [
    {
      id: "1",
      title: "Grocery Shopping",
      amount: 15000,
      category: "Food",
      date: "Today",
      type: "expense",
    },
    {
      id: "2",
      title: "Uber Ride",
      amount: 3500,
      category: "Transport",
      date: "Today",
      type: "expense",
    },
    {
      id: "3",
      title: "Data Subscription",
      amount: 2000,
      category: "Data",
      date: "Yesterday",
      type: "expense",
    },
    {
      id: "4",
      title: "Freelance Payment",
      amount: 45000,
      category: "Income",
      date: "Yesterday",
      type: "income",
    },
    {
      id: "5",
      title: "Lunch",
      amount: 2500,
      category: "Food",
      date: "2 days ago",
      type: "expense",
    },
  ];