import { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { useAuthStore } from "@/base/store/authStore";
import { Redirect } from "expo-router";

export function WelcomeScreen() {
    const { user, hydrated, isFirstTime, loadUser } = useAuthStore();

  useEffect(() => {
    loadUser();
  }, []);

  if (!hydrated) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (isFirstTime) return <Redirect href="/sign-up" />;
  if (user) return <Redirect href="/(tabs)" />;

  return <Redirect href="/sign-in" />;
}