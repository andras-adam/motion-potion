import { DarkTheme, NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { registerRootComponent } from "expo";
import { StatusBar } from "expo-status-bar";
import { Suspense, useEffect } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { HomeScreen } from "./screens/home/HomeScreen";
import { DebugScreen } from "./screens/debug/DebugScreen";
import { NavigatorParamList } from "./types/navigation";
import { MapScreen } from "./screens/map/MapScreen";
import * as Location from "expo-location";
import { StepOne } from "./screens/spell/StepOne";
import { StepFive } from "./screens/spell/StepFive";
import { StepFour } from "./screens/spell/StepFour";
import { StepThree } from "./screens/spell/StepThree";
import { StepTwo } from "./screens/spell/StepTwo";
import { IngredientContextProvider } from './contexts/IngredientContext'
import { SpiceStepOne } from './screens/spell spice/SpiceStepOne';
import { SpiceStepTwo } from './screens/spell spice/SpiceStepTwo';
import { SpiceStepThree } from './screens/spell spice/SpiceStepThree';
import { PotStepOne } from './screens/pot/PotStepOne';
import { PotStepTwo } from './screens/pot/PotStepTwo';
import { PotStepThree } from './screens/pot/PotStepThree';
import { QuestScreen } from './screens/quests/QuestsScreen'
import { ItemsScreen } from './screens/items/ItemsScreen'
import { ProfileScreen } from './screens/profile/ProfileScreen'

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
          <IngredientContextProvider>
            <NavigationContainer theme={DarkTheme}>
              <Stack.Navigator initialRouteName="Map">
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Debug" component={DebugScreen} />
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
                <Stack.Group screenOptions={{ headerShown: false }}>
                  <Stack.Screen name="SpiceSpellStepOne" component={SpiceStepOne} />
                  <Stack.Screen name="SpiceSpellStepTwo" component={SpiceStepTwo} />
                  <Stack.Screen name="SpiceSpellStepThree" component={SpiceStepThree} />
                </Stack.Group>
                <Stack.Group screenOptions={{ headerShown: false }}>
                  <Stack.Screen name="Quests" component={QuestScreen} />
                  <Stack.Screen name="Items" component={ItemsScreen} />
                  <Stack.Screen name="Profile" component={ProfileScreen} />
                </Stack.Group>
              </Stack.Navigator>
              <StatusBar style="auto" />
            </NavigationContainer>
          </IngredientContextProvider>
        </GestureHandlerRootView >
      </SafeAreaProvider >
    </Suspense >
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
