import { CategoryType } from "@/base/interface/history";
import { useTransactionStore } from "@/base/store/transactionStore";
import CategorySelector from "@/components/global/category/Category";
import { Calendar, Filter, TrendingUp } from "lucide-react-native";
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
import { RenderTransactionItem } from "./TransactionItem";

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

export default function HistoryScreen() {
  const { transactions } = useTransactionStore();
  const [selectedCategory, setSelectedCategory] = useState<any | "All">("All");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Filter logic
  const filteredTransactions = useMemo(() => {
    return transactions
      .filter((item) => {
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
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [selectedCategory, startDate, endDate, transactions]);

  const totalSpent = filteredTransactions.reduce(
    (sum, item) => sum + item.amount,
    0,
  );

  const clearFilters = () => {
    setSelectedCategory("All");
    setStartDate("");
    setEndDate("");
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Header */}
      <View className="px-6 pt-4 pb-2">
        <Text className="text-2xl font-bold text-foreground">History</Text>
        <Text className="text-sm text-muted-foreground mt-1">
          Track your past expenses
        </Text>
      </View>

      <ScrollView className="px-3" showsVerticalScrollIndicator={false}>
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
            <View className="w-10 h-10 bg-primary/10 rounded-full items-center justify-center">
              <TrendingUp size={20} color="#DC2626" />
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
                <Text className="text-xs text-primary font-medium">
                  Clear All
                </Text>
              </TouchableOpacity>
            )}
          </View>

          <CategorySelector
            data={CATEGORIES}
            selected={selectedCategory}
            onSelect={setSelectedCategory}
          />
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
              renderItem={({ item }) => <RenderTransactionItem item={item} />}
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
