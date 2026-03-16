import { Calendar, Filter, TrendingUp, X } from "lucide-react-native";
import React, { useMemo, useState } from "react";
import {
  FlatList,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type CategoryType =
  | "Food"
  | "Transport"
  | "Data"
  | "Rent"
  | "School Fees"
  | "Shopping"
  | "Other";

interface Transaction {
  id: string;
  title: string;
  amount: number;
  category: CategoryType;
  date: string; // YYYY-MM-DD format
}

const CATEGORIES: (CategoryType | "All")[] = [
  "All",
  "Food",
  "Transport",
  "Data",
  "Rent",
  "School Fees",
  "Shopping",
  "Other",
];

// Mock Data
const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: "1",
    title: "Lunch at Jollof Spot",
    amount: 3500,
    category: "Food",
    date: "2024-01-15",
  },
  {
    id: "2",
    title: "Uber to Office",
    amount: 2500,
    category: "Transport",
    date: "2024-01-15",
  },
  {
    id: "3",
    title: "MTN Data Subscription",
    amount: 2000,
    category: "Data",
    date: "2024-01-14",
  },
  {
    id: "4",
    title: "Monthly Rent",
    amount: 150000,
    category: "Rent",
    date: "2024-01-01",
  },
  {
    id: "5",
    title: "School Fees Payment",
    amount: 50000,
    category: "School Fees",
    date: "2024-01-05",
  },
  {
    id: "6",
    title: "Groceries at Market",
    amount: 12000,
    category: "Food",
    date: "2024-01-12",
  },
  {
    id: "7",
    title: "New Shoes",
    amount: 15000,
    category: "Shopping",
    date: "2024-01-10",
  },
  {
    id: "8",
    title: "Bus Fare",
    amount: 500,
    category: "Transport",
    date: "2024-01-13",
  },
  {
    id: "9",
    title: "Airtime Top-up",
    amount: 1000,
    category: "Data",
    date: "2024-01-11",
  },
  {
    id: "10",
    title: "Dinner with Friends",
    amount: 8000,
    category: "Food",
    date: "2024-01-09",
  },
  {
    id: "11",
    title: "Keke NAPEP",
    amount: 300,
    category: "Transport",
    date: "2024-01-08",
  },
  {
    id: "12",
    title: "Textbooks",
    amount: 5000,
    category: "School Fees",
    date: "2024-01-07",
  },
];

export default function HistoryScreen() {
  const [selectedCategory, setSelectedCategory] = useState<
    CategoryType | "All"
  >("All");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Filter logic
  const filteredTransactions = useMemo(() => {
    return MOCK_TRANSACTIONS.filter((item) => {
      // Category filter
      const categoryMatch =
        selectedCategory === "All" || item.category === selectedCategory;

      // Date filter
      let dateMatch = true;
      if (startDate && endDate) {
        dateMatch = item.date >= startDate && item.date <= endDate;
      } else if (startDate) {
        dateMatch = item.date >= startDate;
      } else if (endDate) {
        dateMatch = item.date <= endDate;
      }

      return categoryMatch && dateMatch;
    }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [selectedCategory, startDate, endDate]);

  const totalSpent = filteredTransactions.reduce(
    (sum, item) => sum + item.amount,
    0,
  );

  const clearFilters = () => {
    setSelectedCategory("All");
    setStartDate("");
    setEndDate("");
  };

  const renderTransactionItem = ({ item }: { item: Transaction }) => (
    <View className="bg-card rounded-xl p-4 mb-3 border border-border flex-row items-center justify-between">
      <View className="flex-1">
        <View className="flex-row items-center gap-2 mb-1">
          <Text className="text-xs text-muted-foreground font-medium">
            {new Date(item.date).toLocaleDateString("en-NG", {
              month: "short",
              day: "numeric",
            })}
          </Text>
          <View className="px-2 py-0.5 bg-muted rounded-full">
            <Text className="text-xs text-muted-foreground">
              {item.category}
            </Text>
          </View>
        </View>
        <Text
          className="text-base font-semibold text-foreground"
          numberOfLines={1}
        >
          {item.title}
        </Text>
      </View>
      <Text className="text-lg font-bold text-foreground ml-4">
        ₦{item.amount.toLocaleString()}
      </Text>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Header */}
      <View className="px-6 pt-4 pb-2">
        <Text className="text-2xl font-bold text-foreground">History</Text>
        <Text className="text-sm text-muted-foreground mt-1">
          Track your past expenses
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 128 }}
      >
        {/* Summary Card */}
        <View className="bg-card rounded-2xl p-5 mb-6 border border-border">
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-sm text-muted-foreground mb-1">
                Total Spent
              </Text>
              <Text className="text-2xl font-bold text-foreground">
                ₦{totalSpent.toLocaleString()}
              </Text>
              <Text className="text-xs text-muted-foreground mt-1">
                {filteredTransactions.length} transaction
                {filteredTransactions.length !== 1 ? "s" : ""}
              </Text>
            </View>
            <View className="w-12 h-12 bg-primary/10 rounded-full items-center justify-center">
              <TrendingUp size={24} className="text-primary" />
            </View>
          </View>
        </View>

        {/* Filters Section */}
        <View className="mb-6">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-sm font-semibold text-foreground">
              Filter by Category
            </Text>
            {(selectedCategory !== "All" || startDate || endDate) && (
              <TouchableOpacity
                onPress={clearFilters}
                className="flex-row items-center"
              >
                <X size={16} className="text-primary mr-1" />
                <Text className="text-sm text-primary font-medium">
                  Clear All
                </Text>
              </TouchableOpacity>
            )}
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 8 }}
          >
            {CATEGORIES.map((cat) => (
              <TouchableOpacity
                key={cat}
                onPress={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full border ${
                  selectedCategory === cat
                    ? "bg-primary border-primary"
                    : "bg-card border-border"
                }`}
              >
                <Text
                  className={`text-sm font-medium ${
                    selectedCategory === cat
                      ? "text-primary-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Date Range Filter */}
        <View className="mb-6">
          <Text className="text-sm font-semibold text-foreground mb-3">
            Filter by Date
          </Text>
          <View className="flex-row gap-3">
            <View className="flex-1">
              <Text className="text-xs text-muted-foreground mb-2">
                Start Date
              </Text>
              <View className="bg-input border border-border rounded-xl px-3 py-3 flex-row items-center">
                <Calendar size={18} className="text-muted-foreground mr-2" />
                <TextInput
                  className="flex-1 text-foreground text-sm"
                  placeholder="YYYY-MM-DD"
                  placeholderTextColor="text-muted-foreground"
                  value={startDate}
                  onChangeText={setStartDate}
                />
              </View>
            </View>
            <View className="flex-1">
              <Text className="text-xs text-muted-foreground mb-2">
                End Date
              </Text>
              <View className="bg-input border border-border rounded-xl px-3 py-3 flex-row items-center">
                <Calendar size={18} className="text-muted-foreground mr-2" />
                <TextInput
                  className="flex-1 text-foreground text-sm"
                  placeholder="YYYY-MM-DD"
                  placeholderTextColor="text-muted-foreground"
                  value={endDate}
                  onChangeText={setEndDate}
                />
              </View>
            </View>
          </View>
        </View>

        {/* Transactions List */}
        <View>
          <Text className="text-lg font-bold text-foreground mb-4">
            Transactions
          </Text>

          {filteredTransactions.length === 0 ? (
            <View className="items-center justify-center py-12 bg-card rounded-2xl border border-border">
              <Filter size={48} className="text-muted-foreground mb-3" />
              <Text className="text-base font-semibold text-foreground mb-1">
                No transactions found
              </Text>
              <Text className="text-sm text-muted-foreground text-center px-8">
                Try adjusting your filters or date range
              </Text>
            </View>
          ) : (
            <FlatList
              data={filteredTransactions}
              renderItem={renderTransactionItem}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              contentContainerStyle={{ paddingBottom: 16 }}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
