import { Stack, SplashScreen } from "expo-router";
import { useEffect } from "react";
import { useFonts } from "expo-font";
import {
  Poppins_400Regular,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { Nunito_400Regular, Nunito_700Bold } from "@expo-google-fonts/nunito";
import { Sen_400Regular } from "@expo-google-fonts/sen";
import { Unbounded_400Regular } from "@expo-google-fonts/unbounded";
import "../global.css";

SplashScreen.preventAutoHideAsync();

function RootLayout() {
  let [fontsLoaded, error] = useFonts({
    // Google Fonts
    Poppins_400Regular,
    Poppins_700Bold,
    Nunito_400Regular,
    Nunito_700Bold,
    Sen_400Regular,
    Unbounded_400Regular,
  });

  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}

export default RootLayout;
