import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { registerRootComponent } from 'expo'
import { StatusBar } from 'expo-status-bar'
import { Suspense } from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { HomeScreen } from './screens/home/HomeScreen'
import { OtherScreen } from './screens/other/OtherScreen'
import { NavigatorParamList } from './types/navigation'


// Create stack navigator
const Stack = createNativeStackNavigator<NavigatorParamList>()

export default function App() {
  return (
    <Suspense fallback={
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    }>
      <SafeAreaProvider style={styles.wrapper}>
        <GestureHandlerRootView style={styles.wrapper}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Other" component={OtherScreen} />
            </Stack.Navigator>
            <StatusBar style="auto" />
          </NavigationContainer>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </Suspense>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  wrapper: {
    flex: 1
  }
})

registerRootComponent(App)
