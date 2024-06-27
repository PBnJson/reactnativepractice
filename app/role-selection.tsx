import React from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

const RoleSelection = () => {
  const router = useRouter();
  const { mode } = useLocalSearchParams();

  const handleRoleSelection = (role: any) => {
    console.log("ROLE:>>>", role);
    router.push(`/(auth)/${role}/${mode}`);
  };

  console.log("mode from params AFTER CALL>>>>", mode);
  console.log("useLocalSearchParams AFTER CALL>>>", useLocalSearchParams());

  return (
    <View className="bg-primary flex-1 justify-center items-center grid grid-cols-3">
      <Text className="text-5xl text-white">Choose your login</Text>
      <View>
        <TouchableOpacity
          className="p-2"
          onPress={() => handleRoleSelection("teacher")}
        >
          <Text className="p-4 text-4xl text-purple-400 rounded-3xl font-bold font- justify-center items-center border-2 border-white text-center">
            Teacher
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="p-2"
          onPress={() => handleRoleSelection("parent")}
        >
          <Text className="p-4 text-4xl text-purple-400 rounded-3xl font-bold font- justify-center items-center border-2 border-white text-center">
            Parent
          </Text>
        </TouchableOpacity>
      </View>
      <Text className="text-white text-xs font-pregular">
        If your a parent and a teacher you have to choose. Many new features{" "}
        <Text className="text-secondary font-bold text-sm">coming soon.</Text>
      </Text>
    </View>
  );
};

export default RoleSelection;
