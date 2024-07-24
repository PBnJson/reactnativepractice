import React from "react";
import { StyleSheet, Pressable, Text, Platform } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const LinearGradientButton: React.FC<{
  colors: string[];
  onPress: () => void;
  title: string;
}> = ({ colors, onPress, title }) => {
  return (
    <Pressable onPress={onPress} style={buttonStyles.pressable}>
      <LinearGradient colors={colors} style={buttonStyles.button}>
        <Text style={buttonStyles.buttonText}>{title}</Text>
      </LinearGradient>
    </Pressable>
  );
};

const buttonStyles = StyleSheet.create({
  pressable: {
    borderRadius: 5,
    overflow: "hidden",
  },
  button: {
    paddingLeft: 6,
    paddingRight: 6,
    paddingBottom: 2,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    paddingTop: 4,
    paddingRight: 8,
    paddingLeft: 8,
    height: 29,
  },
});

export default LinearGradientButton;
