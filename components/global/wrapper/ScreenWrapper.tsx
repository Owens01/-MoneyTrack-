import { lightTheme, darkTheme } from "@/components/global/theme";
import { StatusBar, View, useColorScheme } from "react-native";

export default function ScreenWrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const scheme = useColorScheme();

  const backgroundColor =
    scheme === "dark" ? darkTheme.background : lightTheme.background;

  return (
    <View style={{ flex: 1, backgroundColor }} className={className}>
      <StatusBar
        barStyle={scheme === "dark" ? "light-content" : "dark-content"}
        backgroundColor={backgroundColor}
      />

      {children}
    </View>
  );
}
