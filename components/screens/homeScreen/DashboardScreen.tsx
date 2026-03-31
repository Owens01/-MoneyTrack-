import { Transaction } from "@/base/interface/transcation";
import { recentTransactions } from "@/components/constants/homeMockData";
import { LinearGradient } from "expo-linear-gradient";
import {
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  Plus,
  TrendingUp,
  Wallet,
} from "lucide-react-native";
import React from "react";
import {
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DashboardScreen() {
  // Mock Data
  const budgetLimit = 100000;
  const totalSpent = 75000;
  const remaining = budgetLimit - totalSpent;
  const percentageUsed = (totalSpent / budgetLimit) * 100;
  const isWarning = percentageUsed >= 80;

  const renderTransaction = ({ item }: { item: Transaction }) => (
    <View className="flex-row items-center justify-between p-4 mb-3 rounded-xl bg-card border border-border">
      <View className="flex-row items-center gap-3">
        <View
          className={`p-2.5 rounded-full ${item.type === "expense" ? "bg-red-50 dark:bg-red-900/20" : "bg-emerald-50 dark:bg-emerald-900/20"}`}
        >
          {item.type === "expense" ? (
            <ArrowUpRight size={20} color="#fb2c36" />
          ) : (
            <ArrowDownRight size={20} color="#10b981" />
          )}
        </View>
        <View>
          <Text className="font-semibold text-foreground text-base">
            {item.title}
          </Text>
          <Text className="text-xs text-muted-foreground">
            {item.category} • {item.date}
          </Text>
        </View>
      </View>
      <Text
        className={`font-bold ${item.type === "expense" ? "text-foreground" : "text-emerald-600 dark:text-emerald-400"}`}
      >
        {item.type === "expense" ? "-" : "+"}₦{item.amount.toLocaleString()}
      </Text>
    </View>
  );

  return (
    <SafeAreaView className="flex-1">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="flex-row items-center justify-end px-6 pt-4 pb-2">
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
              12 Transactions
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
            <TouchableOpacity>
              <Text className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">
                See All
              </Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={recentTransactions}
            renderItem={renderTransaction}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity className="absolute bottom-10 right-3 bg-emerald-500 p-4 rounded-full shadow-lg shadow-emerald-500/30 items-center justify-center">
        <Plus size={24} color="white" strokeWidth={2.5} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
