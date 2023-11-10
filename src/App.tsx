import { registerRootComponent } from 'expo'
import { MotionConstants } from 'expo-motion-detector'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'


export default function App() {
  console.log(MotionConstants.Android)

  return (
    <View style={styles.container}>
      <Text>Wizard Lizard</Text>
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

registerRootComponent(App)
