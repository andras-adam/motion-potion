import { useRoute } from '@react-navigation/native'
import { StyleSheet, Text, View } from 'react-native'
import { UseRoute } from '../../types/navigation'


export function OtherScreen() {
  const { params } = useRoute<UseRoute<'Other'>>()

  return (
    <View style={styles.screen}>
      <Text>Other screen</Text>
      <Text>Param: {params.foo}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 20,
    gap: 20
  }
})
