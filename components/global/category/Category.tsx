import { HorizontalSelectorProps } from "@/base/interface/category";
import React from "react";
import { ScrollView, Text, TouchableOpacity } from "react-native";

export default function CategorySelector({
  data,
  selected,
  onSelect,
  keyExtractor,
  labelExtractor,
}: HorizontalSelectorProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ gap: 8 }}
    >
      {data.map((item, index) => {
        const key = keyExtractor ? keyExtractor(item, index) : String(index);

        const label = labelExtractor ? labelExtractor(item) : String(item);

        const isActive = selected === item;

        return (
          <TouchableOpacity
            key={key}
            onPress={() => onSelect(item)}
            className={`px-4 py-2 rounded-full border ${
              isActive
                ? "bg-emerald-500 border-emerald-300"
                : "bg-card border-border"
            }`}
          >
            <Text
              className={`text-sm font-medium ${
                isActive ? "text-primary-foreground" : "text-muted-foreground"
              }`}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}
