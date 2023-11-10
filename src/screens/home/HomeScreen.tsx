import { StyleSheet, Text, View } from 'react-native'


export function HomeScreen() {
  return (
    <View style={styles.screen}>
      <Text>Wizard Lizard</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
})
