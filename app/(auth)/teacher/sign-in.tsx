import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  StyleSheet,
} from "react-native";
// import GlobalStyles from "../../../GlobalStyles";
import { images } from "../../../constants";
import FormField from "../../../components/FormField";
import LogIn from "../../../components/LogIn";
import { useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { callRpc } from "@/utils/net";

interface SignUpForm {
  email: string;
  password: string;
}

const SignIn = () => {
  const { role } = useLocalSearchParams();

  const [form, setForm] = useState<SignUpForm>({
    email: "",
    password: "",
  });
  const [loadingState, setLoadingState] = useState<any>(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const loginData = {
        email: form.email,
        password: form.password,
      };
      console.log("LOGIN FORM DATA>>>", loginData);
      const res = await callRpc({
        id: 2,
        method: "user.account.login",
        params: { user: loginData },
      });

      if (res && res.result && res.result.token) {
        await AsyncStorage.setItem("jwtToken", res.result.token);
        console.log("User logged in and token stored successfully.");
      } else {
        console.error("Login failed:", res.error);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  // may need to add GlobalStyles.AndroidSafeArea
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
