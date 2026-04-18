import { X } from "lucide-react-native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import ActionSheet, {
  ActionSheetRef,
  ScrollView,
} from "react-native-actions-sheet";

interface CustomSheetProps {
  sheetRef: React.RefObject<ActionSheetRef | null>;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  onClose?: () => void;
}

export function CustomSheet({
  sheetRef,
  title,
  children,
  footer,
  onClose,
}: CustomSheetProps) {
  const handleClose = () => {
    onClose?.();
    sheetRef.current?.hide();
  };

  return (
    <ActionSheet
      ref={sheetRef}
      gestureEnabled
      keyboardHandlerEnabled
      defaultOverlayOpacity={0.5}
      onClose={onClose}
      containerStyle={{ borderTopLeftRadius: 24, borderTopRightRadius: 24 }}
    >
      <View className="flex-row items-center justify-between px-6 py-4 border-b border-border">
        <Text className="text-xl font-bold text-foreground">{title}</Text>
        <TouchableOpacity onPress={handleClose} className="p-2">
          <X size={24} className="text-muted-foreground" />
        </TouchableOpacity>
      </View>

      <ScrollView
        keyboardShouldPersistTaps="handled"
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        {children}

        {footer && (
          <View className="px-6 pt-4 border-t border-border">{footer}</View>
        )}
      </ScrollView>
    </ActionSheet>
  );
}
