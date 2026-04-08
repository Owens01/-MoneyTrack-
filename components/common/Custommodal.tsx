import { X } from "lucide-react-native";
import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { magicModal } from "react-native-magic-modal";
import { SafeAreaView } from "react-native-safe-area-context";

interface CustomModalProps {
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  onClose?: () => void;
}

/**
 * A reusable bottom-sheet style modal built on react-native-magic-modal.
 *
 * Usage:
 *   magicModal.show(() => (
 *     <CustomModal title="My Modal" onClose={() => magicModal.hide()}>
 *       {content}
 *     </CustomModal>
 *   ));
 */
export function CustomModal({
  title,
  children,
  footer,
  onClose,
}: CustomModalProps) {
  const handleClose = () => {
    onClose?.();
    magicModal.hide();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      {/* Dim backdrop — tapping closes the modal */}
      <TouchableOpacity
        activeOpacity={1}
        onPress={handleClose}
        className="flex-1 bg-black/50"
      />

      <SafeAreaView className="bg-background rounded-t-3xl max-h-[90%]">
        {/* Header */}
        <View className="flex-row items-center justify-between px-6 py-4 border-b border-border">
          <Text className="text-xl font-bold text-foreground">{title}</Text>
          <TouchableOpacity onPress={handleClose} className="p-2">
            <X size={24} className="text-muted-foreground" />
          </TouchableOpacity>
        </View>

        {/* Body */}
        {children}

        {/* Optional Footer */}
        {footer && (
          <View className="px-6 py-4 border-t border-border">{footer}</View>
        )}
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
