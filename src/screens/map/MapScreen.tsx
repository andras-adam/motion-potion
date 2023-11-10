import { useNavigation } from "@react-navigation/native";
import {
  Button,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from "react-native";
import { UseNavigation } from "../../types/navigation";
import MapView, { Region } from "react-native-maps";

import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import * as Location from "expo-location";

export function MapScreen() {
  const { goBack } = useNavigation<UseNavigation<"Home">>();
  const [location, setLocation] = useState<Region>({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  return (
    <View style={styles.screen}>
      <MapView
        style={{ flex: 1 }}
        onMapReady={async () => {
          let location = await Location.getCurrentPositionAsync();
          let coords = location.coords;
          setLocation({
            latitude: coords.latitude,
            longitude: coords.longitude,
            latitudeDelta: 0,
            longitudeDelta: 0,
          });
        }}
        initialRegion={location}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
