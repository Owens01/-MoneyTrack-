import { Calendar, Save, X } from "lucide-react-native";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
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

interface AddExpenseModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (expense: {
    title: string;
    amount: string;
    category: CategoryType;
    date: string;
  }) => void;
}

const CATEGORIES: CategoryType[] = [
  "Food",
  "Transport",
  "Data",
  "Rent",
  "School Fees",
  "Shopping",
  "Other",
];

export function AddExpenseModal({
  visible,
  onClose,
  onSave,
}: AddExpenseModalProps) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState<CategoryType>("Food");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const handleSave = () => {
    if (!title.trim()) {
      Alert.alert("Error", "Please enter a title");
      return;
    }
    if (!amount.trim()) {
      Alert.alert("Error", "Please enter an amount");
      return;
    }

    onSave({
      title: title.trim(),
      amount: amount.trim(),
      category,
      date,
    });

    // Reset form
    setTitle("");
    setAmount("");
    setCategory("Food");
    setDate(new Date().toISOString().split("T")[0]);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <View className="flex-1 justify-end bg-black/50">
          <SafeAreaView className="bg-background rounded-t-3xl max-h-[90%]">
            {/* Header */}
            <View className="flex-row items-center justify-between px-6 py-4 border-b border-border">
              <Text className="text-xl font-bold text-foreground">
                Add Expense
              </Text>
              <TouchableOpacity onPress={onClose} className="p-2">
                <X size={24} className="text-muted-foreground" />
              </TouchableOpacity>
            </View>

            <ScrollView
              className="flex-1 px-6 py-4"
              showsVerticalScrollIndicator={false}
            >
              {/* Title Field */}
              <View className="mb-6">
                <Text className="text-sm font-medium text-foreground mb-2">
                  Title
                </Text>
                <TextInput
                  className="bg-input border border-border rounded-xl px-4 py-3 text-foreground"
                  placeholder="e.g., Lunch at Jollof Spot"
                  placeholderTextColor="text-muted-foreground"
                  value={title}
                  onChangeText={setTitle}
                />
              </View>

              {/* Amount Field */}
              <View className="mb-6">
                <Text className="text-sm font-medium text-foreground mb-2">
                  Amount (₦)
                </Text>
                <View className="flex-row items-center bg-input border border-border rounded-xl px-4 py-3">
                  <Text className="text-foreground font-semibold mr-2">₦</Text>
                  <TextInput
                    className="flex-1 text-foreground"
                    placeholder="0.00"
                    placeholderTextColor="text-muted-foreground"
                    value={amount}
                    onChangeText={setAmount}
                    keyboardType="decimal-pad"
                  />
                </View>
              </View>

              {/* Category Field */}
              <View className="mb-6">
                <Text className="text-sm font-medium text-foreground mb-2">
                  Category
                </Text>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{ gap: 8 }}
                >
                  {CATEGORIES.map((cat) => (
                    <TouchableOpacity
                      key={cat}
                      onPress={() => setCategory(cat)}
                      className={`px-4 py-2 rounded-full border ${
                        category === cat
                          ? "bg-primary border-primary"
                          : "bg-input border-border"
                      }`}
                    >
                      <Text
                        className={`text-sm font-medium ${
                          category === cat
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

              {/* Date Field */}
              <View className="mb-6">
                <Text className="text-sm font-medium text-foreground mb-2">
                  Date
                </Text>
                <TouchableOpacity className="bg-input border border-border rounded-xl px-4 py-3 flex-row items-center justify-between">
                  <View className="flex-row items-center">
                    <Calendar
                      size={20}
                      className="text-muted-foreground mr-3"
                    />
                    <Text className="text-foreground">{date}</Text>
                  </View>
                  <Text className="text-muted-foreground text-sm">
                    Tap to change
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>

            {/* Footer */}
            <View className="px-6 py-4 border-t border-border">
              <TouchableOpacity
                onPress={handleSave}
                className="bg-primary rounded-xl py-4 flex-row items-center justify-center"
              >
                <Save size={20} className="text-primary-foreground mr-2" />
                <Text className="text-primary-foreground font-semibold text-base">
                  Save Expense
                </Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
