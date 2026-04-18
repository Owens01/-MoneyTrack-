import { AddExpenseModal } from "@/components/global/ui/sheet/AddExpenseModel";
import { LinearGradient } from "expo-linear-gradient";
import { AlertTriangle, Plus, TrendingUp, Wallet } from "lucide-react-native";
import React, { useRef } from "react";
import {
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTransactionStore } from "@/base/store/transactionStore";
import { renderTransaction } from "./renderTransaction";
import { useRouter } from "expo-router";
import { ActionSheetRef } from "react-native-actions-sheet";

export default function DashboardScreen() {
  const { transactions, addTransaction } = useTransactionStore();
  const router = useRouter();
  const addExpenseModalRef = useRef<ActionSheetRef>(null);

  // Calculate totals from store data
  const budgetLimit = 100000;
  const totalSpent = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, current) => acc + current.amount, 0);
  const remaining = budgetLimit - totalSpent;
  const percentageUsed = (totalSpent / budgetLimit) * 100;
  const isWarning = percentageUsed >= 80;

  const handleAddExpense = () => {
    addExpenseModalRef.current?.show();
  };

  const onSaveExpense = (expense: any) => {
    addTransaction({
      title: expense.title,
      amount: parseFloat(expense.amount),
      category: expense.category,
      date: expense.date,
      type: "expense",
    });
  };

  return (
    <View className="flex-1 bg-background">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="flex-row items-center justify-end px-6 mt-10 pb-2">
          <View>
            <Text className="text-muted-foreground text-sm">Welcome back,</Text>
            <Text className="text-xl font-bold text-foreground">Chinedu</Text>
          </View>
        </View>

        {/* Budget Card */}
        <View className="px-6 mt-4">
          <LinearGradient
            colors={isWarning ? ["#dc2626", "#ef4444"] : ["#059669", "#10b981"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ borderRadius: 20, padding: 24 }}
          >
            <View className="flex-row items-start justify-between mb-6">
              <View>
                <Text className="text-white/80 text-sm font-medium mb-1">
                  Monthly Budget
                </Text>
                <Text className="text-white text-3xl font-bold">
                  ₦{budgetLimit.toLocaleString()}
                </Text>
              </View>
              <View className="bg-white/20 p-2 rounded-lg">
                <Wallet size={20} color="white" />
              </View>
            </View>

            <View className="flex-row justify-between mb-2">
              <Text className="text-white/90 font-medium">
                Spent: ₦{totalSpent.toLocaleString()}
              </Text>
              <Text className="text-white font-bold">
                {percentageUsed.toFixed(0)}%
              </Text>
            </View>

            {/* Progress Bar */}
            <View className="w-full h-3 bg-white/30 rounded-full overflow-hidden">
              <View
                className="h-full bg-white rounded-full"
                style={{ width: `${Math.min(percentageUsed, 100)}%` }}
              />
            </View>

            <View className="mt-4 pt-4 border-t border-white/20">
              <Text className="text-white/70 text-xs uppercase tracking-wider mb-1">
                Remaining
              </Text>
              <Text className="text-white text-2xl font-bold">
                ₦{remaining.toLocaleString()}
              </Text>
            </View>

            {isWarning && (
              <View className="flex-row items-center gap-2 mt-3 bg-white/10 p-2 rounded-lg">
                <AlertTriangle size={16} color="white" />
                <Text className="text-white text-xs font-medium">
                  You&lsquo;ve used 80% of your budget
                </Text>
              </View>
            )}
          </LinearGradient>
        </View>

        {/* Quick Stats */}
        <View className="flex-row px-6 mt-6 gap-4">
          <View className="flex-1 bg-card p-4 rounded-xl border border-border">
            <View className="flex-row items-center gap-2 mb-2">
              <TrendingUp size={18} color="#10b981" />
              <Text className="text-xs text-muted-foreground">This Month</Text>
            </View>
            <Text className="text-lg font-bold text-foreground">
              ₦{totalSpent.toLocaleString()}
            </Text>
            <Text className="text-xs text-muted-foreground mt-1">
              {transactions.filter((t) => t.type === "expense").length}{" "}
              Transactions
            </Text>
          </View>
          <View className="flex-1 bg-card p-4 rounded-xl border border-border">
            <View className="flex-row items-center gap-2 mb-2">
              <Wallet size={18} color="#3B82F6" />
              <Text className="text-xs text-muted-foreground">Savings</Text>
            </View>
            <Text className="text-lg font-bold text-foreground">
              ₦{remaining.toLocaleString()}
            </Text>
            <Text className="text-xs text-muted-foreground mt-1">On track</Text>
          </View>
        </View>

        {/* Recent Transactions */}
        <View className="px-6 mt-8">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-lg font-bold text-foreground">
              Recent Transactions
            </Text>
            <TouchableOpacity onPress={() => router.push("/history")} >
              <Text className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">
                See All
              </Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={transactions.slice(0, 5)}
            renderItem={renderTransaction}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>

      {/* Button */}
      <TouchableOpacity
        onPress={handleAddExpense}
        className="absolute bottom-10 right-3 bg-emerald-500 p-4 rounded-full shadow-lg shadow-emerald-500/30 items-center justify-center"
      >
        <Plus size={24} color="white" strokeWidth={2.5} />
      </TouchableOpacity>

      <AddExpenseModal ref={addExpenseModalRef} onSave={onSaveExpense} />
    </View>
  );
}
