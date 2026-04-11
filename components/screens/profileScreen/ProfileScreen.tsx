import { ErrorToast, SuccessToast } from "@/base/libs/toast";
import { useAuthStore } from "@/base/store/authStore";
import {
  Check,
  ChevronRight,
  Edit2,
  LogOut,
  User,
  Wallet,
} from "lucide-react-native";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function ProfileScreen() {
  const { user, logout } = useAuthStore();
  const [budgetLimit, setBudgetLimit] = useState("100000");
  const [isEditingBudget, setIsEditingBudget] = useState(false);
  const [tempBudget, setTempBudget] = useState(budgetLimit);

  const handleSaveBudget = () => {
    if (tempBudget && !isNaN(Number(tempBudget))) {
      setBudgetLimit(tempBudget);
      setIsEditingBudget(false);
      SuccessToast("Success", "Monthly budget updated successfully");
    } else {
      ErrorToast("Error", "Please enter a valid amount");
    }
  };

  const handleLogout = () => {
    Alert.alert("Log Out", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Log Out",
        style: "destructive",
        onPress: () => {
          logout();
        },
      },
    ]);
  };

  return (
    <View className="flex-1 bg-background">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-6 mt-10 pb-6">
          <Text className="text-2xl font-bold text-foreground">Profile</Text>
        </View>

        {/* Profile Info Card */}
        <View className="px-6 mb-6">
          <View className="bg-card rounded-2xl p-6 border border-border items-center">
            <View className="w-24 h-24 rounded-full bg-emerald-100 dark:bg-emerald-900/30 items-center justify-center mb-4 border-4 border-emerald-500/20">
              <User
                size={40}
                className="text-emerald-600 dark:text-emerald-400"
              />
            </View>
            <Text className="text-xl font-bold text-foreground mb-1">
              Chinedu Okonkwo
            </Text>
            <Text className="text-sm text-muted-foreground mb-4">
              chinedu.okonkwo@email.com
            </Text>
          </View>
        </View>

        {/* Budget Settings */}
        <View className="px-6 mb-6">
          <Text className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider px-2">
            Budget Settings
          </Text>

          <View className="bg-card rounded-xl border border-border overflow-hidden">
            <View className="p-4 border-b border-border">
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center gap-3">
                  <View className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                    <Wallet
                      size={20}
                      className="text-blue-600 dark:text-blue-400"
                    />
                  </View>
                  <Text className="font-medium text-foreground">
                    Monthly Budget
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => setIsEditingBudget(!isEditingBudget)}
                >
                  {isEditingBudget ? (
                    <Check size={20} className="text-emerald-600" />
                  ) : (
                    <Edit2 size={20} className="text-muted-foreground" />
                  )}
                </TouchableOpacity>
              </View>
            </View>

            <View className="p-4">
              {isEditingBudget ? (
                <View className="gap-3">
                  <TextInput
                    value={tempBudget}
                    onChangeText={setTempBudget}
                    keyboardType="numeric"
                    placeholder="Enter amount"
                    className="bg-input border border-border rounded-lg px-4 py-3 text-foreground font-semibold"
                    autoFocus
                  />
                  <View className="flex-row gap-2">
                    <TouchableOpacity
                      onPress={handleSaveBudget}
                      className="flex-1 bg-emerald-600 py-3 rounded-lg items-center"
                    >
                      <Text className="text-primary-foreground font-semibold">
                        Save
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setIsEditingBudget(false);
                        setTempBudget(budgetLimit);
                      }}
                      className="flex-1 bg-muted py-3 rounded-lg items-center"
                    >
                      <Text className="text-muted-foreground font-semibold">
                        Cancel
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <Text className="text-2xl font-bold text-foreground">
                  ₦{Number(budgetLimit).toLocaleString()}
                </Text>
              )}
            </View>
          </View>
        </View>

        {/* App Settings */}
        <View className="px-6 mb-6">
          <Text className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider px-2">
            App Settings
          </Text>

          <View className="bg-card rounded-xl border border-border overflow-hidden">
            {/* Theme Toggle */}
            <View className="p-4 flex-row items-center justify-between border-b border-border">
              <View className="flex-row items-center gap-3">
                <View className="p-2 rounded-lg bg-purple-50 dark:bg-purple-900/20">
                  {/* Using a Sun/Moon icon concept or generic settings icon */}
                  <Text className="text-xl">🎨</Text>
                </View>
                <View>
                  <Text className="font-medium text-foreground">
                    Appearance
                  </Text>
                  <Text className="text-xs text-muted-foreground">
                    Dark mode enabled
                  </Text>
                </View>
              </View>
            </View>

            {/* Notifications */}
            <TouchableOpacity className="p-4 flex-row items-center justify-between">
              <View className="flex-row items-center gap-3">
                <View className="p-2 rounded-lg bg-orange-50 dark:bg-orange-900/20">
                  <Text className="text-xl">🔔</Text>
                </View>
                <View>
                  <Text className="font-medium text-foreground">
                    Notifications
                  </Text>
                  <Text className="text-xs text-muted-foreground">
                    Manage alerts
                  </Text>
                </View>
              </View>
              <ChevronRight size={20} className="text-muted-foreground" />
            </TouchableOpacity>

            {/* Help & Support */}
            <TouchableOpacity className="p-4 flex-row items-center justify-between">
              <View className="flex-row items-center gap-3">
                <View className="p-2 rounded-lg bg-teal-50 dark:bg-teal-900/20">
                  <Text className="text-xl">❓</Text>
                </View>
                <View>
                  <Text className="font-medium text-foreground">
                    Help & Support
                  </Text>
                  <Text className="text-xs text-muted-foreground">
                    Get assistance
                  </Text>
                </View>
              </View>
              <ChevronRight size={20} className="text-muted-foreground" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Logout Button */}
        <View className="px-6 my-4">
          <TouchableOpacity
            onPress={handleLogout}
            className="bg-destructive/10 border border-destructive/20 p-4 rounded-xl flex-row items-center justify-center gap-2"
          >
            <LogOut size={20} color="#DC2626" />
            <Text className="font-semibold text-destructive">Log Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
