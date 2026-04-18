import { Text, View } from "react-native";
import ActionSheet from "react-native-actions-sheet";

export function AboutSheet() {
  return (
    <ActionSheet id="about-sheet"
    gestureEnabled={true}
    snapPoints={[ 60, 90 ]}
    containerStyle={{ borderTopLeftRadius: 20, borderTopRightRadius: 20, backgroundColor: "#fed2ec" }}
    >
      <View className="flex items-center justify-center h-100 px-6">
        <Text className=" text-red-800 text-2xl font-sans-bold">
          Hello, swipe me up and down!
        </Text>
      </View>
    </ActionSheet>
  );
}