import { useEffect } from "react";
import {
  SafeAreaView,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
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
        className="bg-primary h-full"
        style={GlobalStyles.AndroidSafeArea}
      >
        <ScrollView contentContainerStyle={{ width: "100%" }}>
          {/* add h-full, height 100 if it doesnt work */}
          <View className="w-full justify-start items-center px-4 min-h-[85vh]">
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
                  href={{
                    pathname: "/role-selection",
                    params: { mode: "sign-in" },
                  }}
                  className="text-4xl text-purple-400 rounded-3xl font-bold font- justify-center items-center border-2 border-white text-center pr-4 pl-4 pt-2 pb-2"
                >
                  <Text className="">Sign In</Text>
                </Link>
              </View>
              <TouchableOpacity
                className="m-2 "
                onPress={handleConfirmClearStorage}
              >
                <Text className=" p-2 text-2xl text-red-500 font-extrabold border-solid border-2 border-sky-500 border-x-2 rounded-2xl bg-slate-300 text-center self-start">
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

            <Text className="text-lg text-gray-100 font-bold font-pregular text-center mt-10">
              Zero setup required for teachers or parents.
            </Text>
          </View>
        </ScrollView>
        <StatusBar backgroundColor="#161622" style="light" />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
