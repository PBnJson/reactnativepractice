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
      className={`bg-secondary-100 rounded-3xl min-h-[62px] justify-center items-center ${containerStyles} ${
        isLoading ? "opacity-50" : "border-2 border-black"
      }`}
      onPress={handlePress}
      activeOpacity={0.1}
      disabled={isLoading}
    >
      {/* Change the U in sign Up to some sort of arrow */}
      <Text
        className={`text-primary font-bold text-4xl pr-4 pl-4 pt-2 pb-2 ${textStyles}`}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default LogIn;
