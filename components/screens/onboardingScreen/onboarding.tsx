import { useRouter } from "expo-router";
import { ArrowRight } from "lucide-react-native";
import React, { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OnboardingScreen() {
  const router = useRouter();
  const [budget, setBudget] = useState("");

  const handleGetStarted = () => {
    // In a real app, save this budget to async storage or backend
    // For now, navigate to the main app
    router.replace("/(tabs)");
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: 32 }}>
        {/* Hero Image */}
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1556155092-490a1ba16284?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8RmluYW5jZSUyMGFjY291bnRpbmd8ZW58MHx8MHx8fDA%3D",
          }}
          className="w-full h-64 rounded-2xl mb-8"
          resizeMode="cover"
        />

        {/* Welcome Text */}
        <View className="mb-8">
          <Text className="text-3xl font-bold text-foreground mb-3">
            Welcome to ExpenseTracker
          </Text>
          <Text className="text-base text-muted-foreground leading-relaxed">
            Take control of your finances effortlessly. Track expenses, set
            budgets, and achieve your savings goals with ease.
          </Text>
        </View>

        {/* Budget Setup */}
        <View className="mb-8">
          <Text className="text-lg font-semibold text-foreground mb-3">
            Set your monthly budget
          </Text>
          <View className="flex-row items-center bg-input border border-border rounded-xl overflow-hidden">
            <Text className="pl-4 text-xl text-muted-foreground">$</Text>
            <TextInput
              className="flex-1 p-4 text-xl text-foreground font-semibold"
              placeholder="0.00"
              value={budget}
              onChangeText={setBudget}
              keyboardType="numeric"
              placeholderTextColor="#94a3b8"
            />
          </View>
          <Text className="text-sm text-muted-foreground mt-2">
            This helps us track your spending limits and provide insights.
          </Text>
        </View>

        {/* Action Button */}
        <Pressable
          onPress={handleGetStarted}
          className="bg-primary rounded-xl p-4 flex-row items-center justify-center shadow-sm active:opacity-90"
        >
          <Text className="text-primary-foreground text-lg font-semibold mr-2">
            Get Started
          </Text>
          <ArrowRight size={20} className="text-primary-foreground" />
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
