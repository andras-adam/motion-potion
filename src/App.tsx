import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { registerRootComponent } from "expo";
import { StatusBar } from "expo-status-bar";
import { Suspense, useEffect } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { HomeScreen } from "./screens/home/HomeScreen";
import { OtherScreen } from "./screens/other/OtherScreen";
import { NavigatorParamList } from "./types/navigation";
import { MapScreen } from "./screens/map/MapScreen";
import * as Location from "expo-location";
import { StepOne } from './screens/spell/StepOne'
import { StepFive } from './screens/spell/StepFive'
import { StepFour } from './screens/spell/StepFour'
import { StepThree } from './screens/spell/StepThree'
import { StepTwo } from './screens/spell/StepTwo'

// Create stack navigator
const Stack = createNativeStackNavigator<NavigatorParamList>();

export default function App() {
  useEffect(() => {
    (async () => {
      await Location.requestBackgroundPermissionsAsync();
      await Location.requestForegroundPermissionsAsync();
    })();
  }, []);

  return (
    <Suspense
      fallback={
        <View style={styles.container}>
          <ActivityIndicator />
        </View>
      }
    >
      <SafeAreaProvider style={styles.wrapper}>
        <GestureHandlerRootView style={styles.wrapper}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Other" component={OtherScreen} />
              <Stack.Screen
                name="Map"
                options={{ headerShown: false }}
                component={MapScreen}
              />
              <Stack.Group screenOptions={{ headerShown: false }}>
                <Stack.Screen name="SpellStepOne" component={StepOne} />
                <Stack.Screen name="SpellStepTwo" component={StepTwo} />
                <Stack.Screen name="SpellStepThree" component={StepThree} />
                <Stack.Screen name="SpellStepFour" component={StepFour} />
                <Stack.Screen name="SpellStepFive" component={StepFive} />
              </Stack.Group>
            </Stack.Navigator>
            <StatusBar style="auto" />
          </NavigationContainer>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </Suspense>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  wrapper: {
    flex: 1,
  },
});

registerRootComponent(App);
