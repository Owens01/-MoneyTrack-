import { View } from "react-native";
 
export default function ScreenWrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <View className={`flex-1 bg-blue-500 justify-center ${className}`}>
      {children}
    </View>
  );
}
    