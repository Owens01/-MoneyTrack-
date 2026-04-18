import { Transaction } from "@/base/interface/transcation";
import React from "react";
import { Text, View } from "react-native";

export const RenderTransactionItem = ({ item }: { item: Transaction }) => (
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
          <Text className="text-xs text-muted-foreground">{item.category}</Text>
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
