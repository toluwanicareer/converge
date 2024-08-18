import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, Redirect } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { Slot } from 'expo-router';
import 'react-native-reanimated';
import { SessionProvider, useSession } from '@/context/auth/auth';
import { ToastProvider } from 'react-native-toast-notifications'
// import ProtectedRoutes from '@/context/auth/Protected';
// import RegisterScreen from ".."


import { useColorScheme } from '@/hooks/useColorScheme';
import ProtectedRoutes from '@/context/auth/Protected';
import { NotificationProvider } from '@/context/auth/app';


// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [login, setLogin] = useState(false);
  const { session } = useSession();

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
    <ToastProvider
      successColor="green"
    >
      <NotificationProvider
      >
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack
            initialRouteName={login ? 'home' : 'index'}
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="login" options={{ headerShown: false }} />
            <Stack.Screen name="change-password" options={{ headerShown: false }} />
            <Stack.Screen name="otp" options={{ headerShown: false }} />
            <Stack.Screen name="home" options={{ headerShown: false }} />
            <Stack.Screen name="documents" options={{ headerShown: false }} />
            <Stack.Screen name="attendees" options={{ headerShown: false }} />
            <Stack.Screen name="directors" options={{ headerShown: false }} />
            <Stack.Screen name="polls" options={{ headerShown: false }} />
            <Stack.Screen name="questions" options={{ headerShown: false }} />
            <Stack.Screen name="agenda" options={{ headerShown: false }} />
            <Stack.Screen name="announcements" options={{ headerShown: false }} />
            {/* <ProtectedRoutes> */}
            {/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="not-found" options={{ title: 'Oops!' }} /> */}
            {/* </ProtectedRoutes> */}
          </Stack>

        </ThemeProvider>
      </NotificationProvider>
    </ToastProvider>
  );
}

export function Root() {
  return (
    <SessionProvider>
      <Slot />
      {/* <Redirect href="/login" /> */}
    </SessionProvider>
  );
}

// function ProtectedRoutes() {
//   const { session } = useSession();

//   if (!session) {
//     // Redirect to login if not authenticated
//     return <Redirect href="/login" />;
//   }

//   // Render protected routes
//   return <Slot />;
// }

// function AuthChecker({ children }: { children: React.ReactNode }) {
//   const { session } = useSession();

//   if (!session) {
//     // If there's no session (user is not logged in), redirect to the login page
//     return <Redirect href="/login" />;
//   }

//   // If the user is logged in, render the child routes
//   return <>{children}</>;
// }
// export function Root() {
//   return <Redirect href="/login" />;
// }