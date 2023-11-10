import { useNavigation } from '@react-navigation/native';
import { Button, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { UseNavigation } from '../../types/navigation';
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
      <TouchableOpacity style={styles.buttonContainer}>
        <Button title="Button" onPress={() => { /* action here */ }} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 20,
    gap: 20
  },
  buttonContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white', // or any other color
    elevation: 3, // for Android shadow
  }
})
