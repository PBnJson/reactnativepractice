import React from "react";
import { Text, TouchableOpacity } from "react-native";

const LogIn = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
}: any) => {
  return (
    <TouchableOpacity
      className={`bg-secondary-100 rounded-xl min-h-[62px] justify-center items-center ${containerStyles} ${
        isLoading ? "opacity-50" : "border-2 border-white"
      }`}
      onPress={handlePress}
      activeOpacity={0.1}
      disabled={isLoading}
    >
      {/* Change the U in sign Up to some sort of arrow */}
      <Text
        className={`text-primary font-psemibold text-4xl p-4 ${textStyles}`}
      >
        Sign Up
      </Text>
    </TouchableOpacity>
  );
};

export default LogIn;
