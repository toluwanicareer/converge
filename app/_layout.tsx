import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, Redirect } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
// import RegisterScreen from ".."


import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [login, setLogin] = useState(false);

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="otp" options={{ headerShown: false }} />
        <Stack.Screen name="register" options={{ headerShown: false }}/>
        {/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="not-found" options={{ title: 'Oops!' }} /> */}
        <Stack.Screen name="home" options={{ headerShown: false }} />
        <Stack.Screen name="documents" options={{ headerShown: false }} />
        <Stack.Screen name="attendees" options={{ headerShown: false }} />
        <Stack.Screen name="agenda" options={{ headerShown: false }} />
        <Stack.Screen name="directors" options={{ headerShown: false }} />
        <Stack.Screen name="polls" options={{ headerShown: false }} />
        <Stack.Screen name="questions" options={{ headerShown: false }} />
        <Stack.Screen name="announcements" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}

export function Root() {
  return <Redirect href="/login" />;
}