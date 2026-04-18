import { AddExpenseModalProps, CategoryType } from "@/base/interface/category";
import CategorySelector from "@/components/global/category/Category";
import { CustomSheet } from "@/components/global/sheet/CustomModal";
import { Calendar, Save } from "lucide-react-native";
import React, { forwardRef, useImperativeHandle, useRef, useState } from "react";
import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { ActionSheetRef } from "react-native-actions-sheet";

const CATEGORIES: CategoryType[] = [
  "Food",
  "Transport",
  "Data",
  "Rent",
  "School Fees",
  "Shopping",
  "Other",
];

export const AddExpenseModal = forwardRef<ActionSheetRef, AddExpenseModalProps>(
  ({ onSave }, ref) => {
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("Food");
    const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

    const sheetRef = useRef<ActionSheetRef>(null);

    // Expose the sheet's show/hide methods to the parent via the provided ref
    useImperativeHandle(ref, () => ({
      show: () => sheetRef.current?.show(),
      hide: () => sheetRef.current?.hide(),
    }) as ActionSheetRef);

    const handleSave = () => {
      if (!title.trim()) {
        Alert.alert("Error", "Please enter a title");
        return;
      }
      if (!amount.trim()) {
        Alert.alert("Error", "Please enter an amount");
        return;
      }
      if (!date.trim() || date.length !== 10) {
        Alert.alert("Error", "Please enter a valid format (YYYY-MM-DD)");
        return;
      }

      onSave({
        title: title.trim(),
        amount: amount.trim(),
        category,
        date: date.trim(),
      });

      // Reset form & close the sheet
      setTitle("");
      setAmount("");
      setCategory("Food");
      setDate(new Date().toISOString().split("T")[0]);
      sheetRef.current?.hide();
    };

    return (
      <CustomSheet
        sheetRef={sheetRef}
        title="Add Expense"
      >
        <ScrollView
          className="px-6 py-4"
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
            <CategorySelector
              data={CATEGORIES}
              selected={category}
              onSelect={setCategory}
            />
          </View>

          {/* Date Field */}
          <View className="mb-6">
            <Text className="text-sm font-medium text-foreground mb-2">
              Date (YYYY-MM-DD)
            </Text>
            <View className="flex-row items-center bg-input border border-border rounded-xl px-4 py-3">
              <Calendar size={20} className="text-muted-foreground mr-3" />
              <TextInput
                className="flex-1 text-foreground"
                placeholder="YYYY-MM-DD"
                placeholderTextColor="text-muted-foreground"
                value={date}
                onChangeText={setDate}
                maxLength={10}
              />
            </View>
          </View>

          {/* Footer Save Button */}
          <View className="mt-4 mb-8">
            <TouchableOpacity
              onPress={handleSave}
              className="bg-emerald-500 rounded-xl py-4 flex-row items-center justify-center gap-2"
            >
              <Save size={20} className="text-primary-foreground" />
              <Text className="text-primary-foreground font-semibold text-base">
                Save Expense
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </CustomSheet>
    );
  }
);

AddExpenseModal.displayName = "AddExpenseModal";
