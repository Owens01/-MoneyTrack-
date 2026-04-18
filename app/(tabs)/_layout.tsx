import { Tabs, useRouter } from "expo-router";
import { Home, List, User } from "lucide-react-native";
import { useEffect } from "react";
import { useAuthStore } from "@/base/store/authStore";

export default function TabsLayout() {
  const { user, hydrated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (hydrated && !user) {
      router.replace("/");
    }
  }, [user, hydrated, router]);
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#ffffff",
          borderTopColor: "#f1f5f9",
        },
        tabBarActiveTintColor: "#34d399",
        tabBarInactiveTintColor: "#64748b",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <Home
              className={focused ? "text-emerald-500" : "text-slate-400"}
              size={24}
              strokeWidth={focused ? 2.5 : 2}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "History",
          tabBarIcon: ({ focused }) => (
            <List
              className={focused ? "text-emerald-500" : "text-slate-400"}
              size={24}
              strokeWidth={focused ? 2.5 : 2}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <User
              className={focused ? "text-emerald-500" : "text-slate-400"}
              size={24}
              strokeWidth={focused ? 2.5 : 2}
            />
          ),
        }}
      />
    </Tabs>
  );
}
