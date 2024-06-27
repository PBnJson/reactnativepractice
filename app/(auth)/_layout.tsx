import React from "react";
import { Stack } from "expo-router";

const AuthLayout = () => {
  const roles = ["teacher", "parent"];

  return (
    <Stack>
      {roles.map((role) => (
        <Stack.Screen
          key={`${role}-sign-in`}
          name={`${role}/sign-in`}
          options={{ headerShown: false }}
        />
      ))}
      {roles.map((role) => (
        <Stack.Screen
          key={`${role}-sign-up`}
          name={`${role}/sign-up`}
          options={{ headerShown: false }}
        />
      ))}
    </Stack>
  );
};

export default AuthLayout;
