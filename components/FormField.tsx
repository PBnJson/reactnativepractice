import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { icons } from "../constants";

const FormField = ({
  title,
  value,
  placeholder,
  handleText,
  otherStyles,
  ...props
}: any) => {
  const [showPassword, setShowPassword] = useState<any>(false);
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-white font-pmedium text-base">{title}</Text>
      <View className="border-2 border-t-black w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary focus:bg-white  focus:text-black items-center flex-row">
        <TextInput
          className="flex-1 text-white font-psemibold text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          onChangeText={handleText}
          secureTextEntry={title === "Password" && !showPassword}
        />
        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              className="w-10 h-10"
              source={!showPassword ? icons.eye : icons.eyeHide}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
