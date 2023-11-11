import { useNavigation } from "@react-navigation/native";
import {
  Button,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
  Modal,
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
  const [isTooFarPopupVisible, setIsTooFarPopupVisible] = useState(false);
  const [isProximityPopupVisible, setIsProximityPopupVisible] = useState(false);



  const { navigate } = useNavigation<UseNavigation<"Map">>();

  const checkProximityAndTogglePopup = (markerCoord: LatLng) => {
    if (location) {
      const distance = getDistance(
        { latitude: location.latitude, longitude: location.longitude },
        markerCoord
      );
      const threshold = 100;

      if (distance <= threshold) {
        setIsProximityPopupVisible(true);
        setIsTooFarPopupVisible(false);
      } else {
        setIsProximityPopupVisible(false);
        setIsTooFarPopupVisible(true);
      }
    }
  };


  function getDistance(coord1: LatLng, coord2: LatLng): number {
    const toRad = (value: number) => (value * Math.PI) / 180;
    const R = 6371e3; //ear radius
    const phi_1 = toRad(coord1.latitude);
    const phi_2 = toRad(coord2.latitude);
    const delta_phi = toRad(coord2.latitude - coord1.latitude);
    const Δ_long = toRad(coord2.longitude - coord1.longitude);

    const a =
      Math.sin(delta_phi / 2) * Math.sin(delta_phi / 2) +
      Math.cos(phi_1) * Math.cos(phi_2) * Math.sin(Δ_long / 2) * Math.sin(Δ_long / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    console.log(R * c);
    return R * c;
  }


  const markerData: MarkerItem[] = [
    {
      coord: { latitude: 60.161, longitude: 24.903 },
      asset: require("../../../assets/Question-Map.png"),
    },
    {
      coord: { latitude: 60.165, longitude: 24.903 },
      asset: require("../../../assets/Question-Map.png"),
    },
    {
      coord: { latitude: 60.162, longitude: 24.908 },
      asset: require("../../../assets/Question-Map.png"),
    },
    {
      coord: { latitude: 60.1627, longitude: 24.913 },
      asset: require("../../../assets/Question-Map.png"),
    },
    {
      coord: { latitude: 60.1645, longitude: 24.909 },
      asset: require("../../../assets/Question-Map.png"),
    },
    {
      coord: { latitude: 60.1633, longitude: 24.9015 },
      asset: require("../../../assets/Question-Map.png"),
    },
    {
      coord: { latitude: 60.1635, longitude: 24.906 },
      asset: require("../../../assets/Question-Map.png"),
    },
    {
      coord: { latitude: 60.1602, longitude: 24.90842 },
      asset: require("../../../assets/Question-Map.png"),
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
      <MapView style={{ flex: 1 }} initialRegion={region} showsUserLocation={true}>
        <Marker coordinate={{ latitude: 60.16200, longitude: 24.9052 }} image={require("../../../assets/Pumpkin-Map.png")} onPress={() => checkProximityAndTogglePopup({ latitude: 60.16200, longitude: 24.9052 })} />
        <Marker coordinate={{ latitude: 60.16215, longitude: 24.9060 }} image={require("../../../assets/Pot-Map.png")} onPress={() => checkProximityAndTogglePopup({ latitude: 60.16215, longitude: 24.9060 })} />
        <Marker coordinate={{ latitude: 60.16190, longitude: 24.9045 }} image={require("../../../assets/Chili-Map.png")} onPress={() => checkProximityAndTogglePopup({ latitude: 60.16190, longitude: 24.9045 })} />
        {markerData.map((item, idx) => (
          <Marker key={idx} coordinate={item.coord} image={item.asset} />
        ))}
      </MapView>

      {isProximityPopupVisible && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={isProximityPopupVisible}
          onRequestClose={() => setIsProximityPopupVisible(false)}
        >
          <View style={styles.popupContainer}>
            <Text>You are close to the marker!</Text>
            <Button title="Collect" onPress={() => setIsProximityPopupVisible(false)} />
            <Button title="Close" onPress={() => setIsProximityPopupVisible(false)} />
          </View>
        </Modal>
      )}
      {isTooFarPopupVisible && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={isTooFarPopupVisible}
          onRequestClose={() => setIsTooFarPopupVisible(false)}
        >
          <View style={styles.popupContainer}>
            <Text>You're too far away!</Text>
            <Button title="Close" onPress={() => setIsTooFarPopupVisible(false)} />
          </View>
        </Modal>
      )}
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
  popupContainer: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  }
});