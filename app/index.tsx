import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  Pressable,
} from "react-native";
import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import GlobalStyles from "../GlobalStyles.js";
import images from "@/constants/images.js";
import { Link, router } from "expo-router";
import LogIn from "../components/LogIn";
import { StatusBar } from "expo-status-bar";
import { callRpc } from "../utils/net";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const getInitial = async () => {
      const res = await callRpc({
        method: "user.get.initial",
        params: {},
        id: "2",
      });
      console.log("RES>>>", res);
    };
    getInitial();
  }, []);

  // useEffect(() => {
  //   console.log("Current theme:", isDarkMode ? "Dark" : "Light");
  // }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => {
      console.log("Toggling theme. New theme:", !prevMode ? "Dark" : "Light");
      return !prevMode;
    });
  };

  const themeStyles = isDarkMode
    ? {
        "bg-primary": "bg-gray-900",
        "bg-secondary": "bg-gray-800",
        "text-primary": "text-white",
        "text-secondary": "text-gray-300",
      }
    : {
        "bg-primary": "bg-white",
        "bg-secondary": "bg-gray-100",
        "text-primary": "text-black",
        "text-secondary": "text-gray-700",
      };

  console.log("Rendering with theme:", isDarkMode ? "Dark" : "Light");

  const clearStorage = async () => {
    try {
      // use something more secure for storage
      AsyncStorage.clear();
      console.log("storage cleared");
    } catch (error) {
      console.log("error clearing storage");
    }
  };
  const handleConfirmClearStorage = () => {
    Alert.alert("Clear Storage", "Clearing all stored data cannot be undone.", [
      { text: "Cancel", style: "cancel" },
      { text: "OK", onPress: clearStorage },
    ]);
  };
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView
        className={`${themeStyles["bg-primary"]} h-full`}
        style={GlobalStyles.AndroidSafeArea}
      >
        <ScrollView contentContainerStyle={{ width: "100%" }}>
          {/* add h-full, height 100 if it doesnt work */}
          <View className="w-full justify-start items-center px-4 min-h-[85vh]">
            <Pressable
              onPress={toggleTheme}
              className={`absolute top-4 right-4 z-10 w-8 h-8 rounded-full flex items-center justify-center ${themeStyles["bg-secondary"]}`}
            >
              <Text className={themeStyles["text-primary"]}>
                {isDarkMode ? "☀️" : "🌙"}
              </Text>
            </Pressable>

            <Image source={images.logo} className="w-[200px] h-[90px]" />
            <Image
              source={images.cards}
              className="max-w-[380px] w=full h-[300px]"
              resizeMode="contain"
            />
            <View className="relative mt-5">
              {/* THIS RIGHT HERE>>>> */}
              <Text
                className={`text-3xl ${themeStyles["text-primary"]} font-bold text-center`}
              >
                Reward, Compete, Spend
              </Text>

              <View className="flex-row mt-5">
                <Link
                  href={{
                    pathname: "/role-selection",
                    params: { mode: "sign-in" },
                  }}
                  className={`text-4xl ${themeStyles["text-secondary"]} font-bold justify-center items-center border-2 border-${themeStyles["text-primary"]} rounded-3xl text-center px-4 py-2 ${themeStyles["bg-secondary"]}`}
                >
                  <Text className={themeStyles["text-secondary"]}>Sign In</Text>
                </Link>
              </View>
              <TouchableOpacity
                className="m-2 "
                onPress={handleConfirmClearStorage}
              >
                <Text
                  className={`p-2 text-2xl ${themeStyles["text-secondary"]} font-extrabold border-solid border-2 border-${themeStyles["text-primary"]} rounded-2xl ${themeStyles["bg-secondary"]} text-center self-start`}
                >
                  Clear Data
                </Text>
              </TouchableOpacity>
              <Image
                source={images.path}
                className="z-10 w-[300] h-[50]"
                resizeMode="contain"
              />
            </View>
            <View className="left-20 bottom-2">
              <LogIn
                title="Sign Up"
                handlePress={() => {
                  router.push({
                    pathname: "/role-selection",
                    params: { mode: "sign-up" },
                  });
                }}
                // containerStyles={}
                // textStyles={}
              />
            </View>

            <Text
              className={`text-lg ${themeStyles["text-primary"]} font-bold font-standard text-center mt-10`}
            >
              Zero setup required for teachers or parents.
            </Text>
          </View>
        </ScrollView>
        <StatusBar style={isDarkMode ? "light" : "dark"} />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
