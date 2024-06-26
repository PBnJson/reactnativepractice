import React from "react";
import { SafeAreaView, Text, View, ScrollView, Image } from "react-native";
import GlobalStyles from "../GlobalStyles.js";
import images from "@/constants/images.js";
import { Link, Redirect, router } from "expo-router";
import LogIn from "../components/LogIn";
import { StatusBar } from "expo-status-bar";
// import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaView
      className="bg-primary h-full"
      style={GlobalStyles.AndroidSafeArea}
    >
      <ScrollView contentContainerStyle={{ width: "100%" }}>
        {/* add h-full, height 100 if it doesnt work */}
        <View className="w-full justify-start items-center px-4">
          <Image source={images.logo} className="w-[200px] h-[90px]" />
          <Image
            source={images.cards}
            className="max-w-[380px] w=full h-[300px]"
            resizeMode="contain"
          />
          <View className="relative mt-5">
            {/* THIS RIGHT HERE>>>> */}
            <Text className="text-3xl text-white font-bold text-center">
              Reward, Compete, Spend
            </Text>

            <View className="flex-row mt-5">
              <Link
                href={"/home"}
                className="text-5xl text-purple-400 font-bold text-center mt-5 ml-5"
              >
                Sign In
              </Link>
            </View>
            <Image
              source={images.path}
              className="z-10 w-[300] h-[50]"
              resizeMode="contain"
            />
          </View>
          <View className="left-20 bottom-2">
            <LogIn
              // title="Sign Up"
              handlePress={() => {
                router.push("/sign-up");
              }}
              // containerStyles={}
              // textStyles={}
            />
          </View>
          <Text className="text-lg text-gray-100 font-bold font-pregular text-center mt-10">
            Zero setup required for teachers or parents.
          </Text>
        </View>
      </ScrollView>
      <StatusBar backgroundColor={"#161622"} style="light" />
    </SafeAreaView>
  );
}
