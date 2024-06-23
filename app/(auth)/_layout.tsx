import React from "react";
import { View, Text, StyleSheet } from "react-native";

const AuthLayout = (props: any) => {
  return (
    <View style={styles.screen}>
      <Text>Auth Layout</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AuthLayout;
