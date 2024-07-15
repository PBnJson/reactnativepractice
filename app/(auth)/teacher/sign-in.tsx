import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import GlobalStyles from "../../../GlobalStyles.js";
import images from "@/constants/images.js";
import FormField from "../../../components/FormField";
import LogIn from "../../../components/LogIn";
import { router } from "expo-router";
import { callRpc } from "@/utils/net";

const SignIn = () => {
  const { role } = useLocalSearchParams();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loadingState, setLoadingState] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoadingState(true);
    try {
      const data = await callRpc({
        id: "123",
        method: "user.account.login",
        params: {
          user: {
            email: form.email,
            password: form.password,
          },
        },
      });

      console.log("RES HEADERS>>>>>", data?._resHeaders);

      console.log("LOGIN RES JSON>>>> ", data);

      const authToken = data?._resHeaders?.get("authorization");

      console.log("AUTHTOKEN>>>>", authToken);

      console.log("DATA LOGIN>>>", data);

      if (authToken) {
        // Simulate successful login and store a token
        await AsyncStorage.setItem("jwtToken", authToken);
        console.log("saved token>>>>");
      }
      // Navigate to the home screen
      router.push("/teacher/home-screen");
    } catch (error) {
      console.error("Login error>>>>", error);
    } finally {
      setLoadingState(false);
    }
  };

  return (
    <SafeAreaView style={[styles.safeArea]}>
      <ScrollView>
        <View style={styles.container}>
          <Image source={images.logo} style={styles.logo} />
          <Text style={styles.title}>{role}</Text>
          <FormField
            title="Email"
            value={form.email}
            handleText={(e: any) => setForm({ ...form, email: e })}
            otherStyles={styles.inputMargin}
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleText={(e: any) => setForm({ ...form, password: e })}
            otherStyles={styles.inputMargin}
            keyboardType="default"
          />
          <LogIn
            title={`${role} Sign In`}
            containerStyles="mt-8"
            handlePress={handleSubmit}
            isLoading={loadingState}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#161622",
  },
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    paddingHorizontal: 12,
    marginVertical: 6,
  },
  logo: {
    width: 175,
    height: 135,
  },
  title: {
    fontSize: 24,
    color: "white",
    fontWeight: "600",
  },
  inputMargin: {
    marginTop: 14,
  },
});

export default SignIn;
