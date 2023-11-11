import { useNavigation } from "@react-navigation/native";
import {
  Button,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from "react-native";
import { UseNavigation } from "../../types/navigation";
import MapView, { LatLng, Marker, Region } from "react-native-maps";

import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useMemo, useState } from "react";
import * as Location from "expo-location";
import { LocationObjectCoords } from "expo-location";

type MarkerItem = {
  coord: LatLng;
  asset: number;
};

export function MapScreen() {
  const [region, setRegion] = useState<Region>({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.001,
    longitudeDelta: 0.005,
  });
  const [renderReady, setRenderReady] = useState(false);

  const { navigate } = useNavigation<UseNavigation<"Map">>();


  const markerData: MarkerItem[] = [
    // The one below is in the building, could be the only one made clickable
    {
      coord: { latitude: 60.16178, longitude: 24.9052 },
      asset: require("../../../assets/placeholderdot.png"),
    },
    {
      coord: { latitude: 60.161, longitude: 24.903 },
      asset: require("../../../assets/placeholderdot.png"),
    },
    {
      coord: { latitude: 60.165, longitude: 24.903 },
      asset: require("../../../assets/placeholderdot.png"),
    },
    {
      coord: { latitude: 60.162, longitude: 24.908 },
      asset: require("../../../assets/placeholderdot.png"),
    },
    {
      coord: { latitude: 60.1627, longitude: 24.913 },
      asset: require("../../../assets/placeholderdot.png"),
    },
    {
      coord: { latitude: 60.1645, longitude: 24.909 },
      asset: require("../../../assets/placeholderdot.png"),
    },
    {
      coord: { latitude: 60.1633, longitude: 24.9015 },
      asset: require("../../../assets/placeholderdot.png"),
    },
    {
      coord: { latitude: 60.1635, longitude: 24.906 },
      asset: require("../../../assets/placeholderdot.png"),
    },
    {
      coord: { latitude: 60.1602, longitude: 24.90842 },
      asset: require("../../../assets/placeholderdot.png"),
    },
  ];

  useEffect(() => {
    (async () => {
      let location = await Location.getLastKnownPositionAsync();
      if (!location) {
        location = await Location.getCurrentPositionAsync();
      }
      let coords = location.coords;
      setRegion({
        latitude: coords.latitude,
        longitude: coords.longitude,
        latitudeDelta: 0.04,
        longitudeDelta: 0.02,
      });
      setLocation(coords);
      setRenderReady(true);
    })();
  }, []);

  let [location, setLocation] = useState<LocationObjectCoords | undefined>();

  useEffect(() => {
    Location.watchPositionAsync(
      {
        accuracy: 5,
        mayShowUserSettingsDialog: true,
        timeInterval: 300,
        distanceInterval: 5,
      },
      (loc) => {
        setLocation(loc.coords);
      }
    );
  }, []);

  if (!renderReady) {
    return <View style={styles.screen}></View>;
  }

  return (
    <View style={styles.screen}>
      <MapView style={{ flex: 1 }} initialRegion={region}>
        {markerData.map((item, idx) => (
          <Marker key={idx} coordinate={item.coord} image={item.asset} />
        ))}
        {location && (
          <Marker
            key={-1}
            coordinate={location}
            image={require("../../../assets/bluedot.png")}
          />
        )}
      </MapView>
      <View style={styles.buttonContainer}>
        <Button
          title="To main screen"
          onPress={() => navigate("Home")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    top: '10%',
    alignSelf: 'flex-start'
  },
});