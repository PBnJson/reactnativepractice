import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";

const RoleSelection = () => {
  const router = useRouter();

  const handleRoleSelection = (role: string) => {
    router.push(`/(auth)/${role}/sign-in?role=${role}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose your login</Text>
      <View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleRoleSelection("teacher")}
        >
          <Text style={styles.buttonText}>Teacher</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleRoleSelection("parent")}
        >
          <Text style={styles.buttonText}>Parent</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.footer}>
        If you're a parent and a teacher you have to choose. Many new features{" "}
        <Text style={styles.footerHighlight}>coming soon.</Text>
      </Text>
      <StatusBar backgroundColor="#161622" style="light" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#161622",
  },
  title: {
    fontSize: 40,
    color: "white",
    marginBottom: 20,
  },
  button: {
    padding: 10,
    margin: 10,
    backgroundColor: "#FF9001",
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 24,
    color: "white",
  },
  footer: {
    fontSize: 14,
    color: "gray",
    textAlign: "center",
  },
  footerHighlight: {
    color: "#FF9001",
    fontWeight: "bold",
  },
});

export default RoleSelection;
