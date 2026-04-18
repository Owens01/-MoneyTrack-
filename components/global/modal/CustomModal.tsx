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

interface CustomModalProps {
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  onClose?: () => void;
}

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
      className="flex-1 justify-center items-center px-4"
    >
      {/* backdrop*/}
      <View
        style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0 }}
        className="bg-black/50"
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={handleClose}
          className="flex-1"
        />
      </View>

      <View className="bg-background rounded-3xl w-full max-h-[85%] shrink overflow-hidden">
        {/* Header */}
        <View className="flex-row items-center justify-between px-6 py-4 border-b border-border">
          <Text className="text-xl font-bold text-foreground">{title}</Text>
          <TouchableOpacity onPress={handleClose} className="p-2">
            <X size={24} className="text-muted-foreground" />
          </TouchableOpacity>
        </View>

        {children}

        {footer && (
          <View className="px-6 py-4 border-t border-border">{footer}</View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}
