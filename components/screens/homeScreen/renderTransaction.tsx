import { Transaction } from "@/base/interface/transcation";
import { ArrowDownRight, ArrowUpRight } from "lucide-react-native";
import { Text, View } from "react-native";

export const renderTransaction = ({ item }: { item: Transaction }) => {
  return (
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
};
