import React from "react";
import { Pressable, Text, View } from "react-native";
import { useMagicModal } from "react-native-magic-modal";

export const MagicModalScreen = () => {
  const { hide } = useMagicModal();
  return (
    <View className="py-4 px-8 bg-white dark:bg-black rounded-lg items-center justify-center border border-gray-200 dark:border-gray-400">
      <Text className="text-2xl font-bold text-black dark:text-white">
        Thanks for using our App!
      </Text>
      <Text className="text-sm text-gray-500 dark:text-gray-400 mt-2 text-center">
         Your support means a lot to us and helps us continue improving the App!
      </Text>
      <Pressable
        className="bg-blue-500 py-3 px-5 rounded-md mt-8"
        onPress={() => hide(undefined)}
      >
        <Text className="text-white">Close</Text>
      </Pressable>
    </View>
  );
};