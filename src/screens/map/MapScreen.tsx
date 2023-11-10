import { useNavigation } from '@react-navigation/native'
import { Button, StyleSheet, Text, View } from 'react-native'
import { UseNavigation } from '../../types/navigation'
import MapView from 'react-native-maps';

export function MapScreen() {
  const { navigate } = useNavigation<UseNavigation<'Map'>>();

  return (
    <View style={styles.screen}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
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
