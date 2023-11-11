import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Image,
  TouchableHighlight,
  Pressable,
} from "react-native";
import { UseNavigation } from "../../types/navigation";
import MapView, { LatLng, Marker, Region } from "react-native-maps";

import { useEffect, useState } from "react";
import * as Location from "expo-location";
import { LocationObjectCoords } from "expo-location";
import { night_style } from "../../mapstyles/night_style";

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

  const { navigate } = useNavigation<UseNavigation<"Map">>();

  const checkProximityAndTogglePopup = (markerCoord: LatLng, marker: string) => {
    if (location) {
      const distance = getDistance(
        { latitude: location.latitude, longitude: location.longitude },
        markerCoord
      );
      const threshold = 800;

      if (distance <= threshold) {
        setIsTooFarPopupVisible(false);
        if (marker === "pumpkin") {
          navigate("SpellStepOne");
        }
        else if (marker === "chili") {
          navigate("SpiceSpellStepOne")
        }
        else if (marker === "pot") { //TODO: Add zod logic here
          //navigate("???")
        }
      } else {
        setIsTooFarPopupVisible(true);
      }
    }
  };

  function getDistance(coord1: LatLng, coord2: LatLng): number {
    const toRad = (value: number) => (value * Math.PI) / 180;
    const R = 6371e3; //earth radius
    const toRad_1 = toRad(coord1.latitude);
    const toRad_2 = toRad(coord2.latitude);
    const delta_phi = toRad(coord2.latitude - coord1.latitude);
    const delta_long = toRad(coord2.longitude - coord1.longitude);

    const a =
      Math.sin(delta_phi / 2) * Math.sin(delta_phi / 2) +
      Math.cos(toRad_1) *
      Math.cos(toRad_2) *
      Math.sin(delta_long / 2) *
      Math.sin(delta_long / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
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

  const [ granted, setGranted ] = useState(false)

  useEffect(() => {
    if (!granted) return
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
  }, [ granted ]);

  let [location, setLocation] = useState<LocationObjectCoords | undefined>();

  useEffect(() => {
    if (!granted) return
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
  }, [ granted ]);

  useEffect(() => {
    (async () => {
      const response = await Location.requestForegroundPermissionsAsync()
      setGranted(response.granted)
    })()
  }, [])

  if (!renderReady) {
    return <View style={styles.screen}></View>;
  }

  return (
    <View style={styles.screen}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={region}
        showsUserLocation={true}
        customMapStyle={night_style}
        showsCompass={false}
        toolbarEnabled={false}
        showsMyLocationButton={false}
      >
        <Marker
          coordinate={{ latitude: 60.162, longitude: 24.9052 }}
          image={require("../../../assets/Pumpkin-Map.png")}
          onPress={() =>
            checkProximityAndTogglePopup({
              latitude: 60.162,
              longitude: 24.9052,
            }, "pumpkin")
          }
        />
        <Marker
          coordinate={{ latitude: 60.16215, longitude: 24.906 }}
          image={require("../../../assets/Pot-Map.png")}
          onPress={() =>
            checkProximityAndTogglePopup({
              latitude: 60.16215,
              longitude: 24.906,
            }, "pot")
          }
        />
        <Marker
          coordinate={{ latitude: 60.1619, longitude: 24.9045 }}
          image={require("../../../assets/Chili-Map.png")}
          onPress={() =>
            checkProximityAndTogglePopup({
              latitude: 60.1619,
              longitude: 24.9045,
            }, "chili")
          }
        />
        {markerData.map((item, idx) => (
          <Marker key={idx} coordinate={item.coord} image={item.asset} />
        ))}
      </MapView>
      {isTooFarPopupVisible && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={isTooFarPopupVisible}
          onRequestClose={() => setIsTooFarPopupVisible(false)}
        >
          <View style={styles.popupContainer}>
            <Text style={styles.modalText}>You're too far away!</Text>
            <View style={styles.modalButtonsContainer}>
              <Pressable
                onPress={() => setIsTooFarPopupVisible(false)}
                style={styles.modalButton}
              >
                <Text style={styles.modalButtonText}> Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      )}
      <View style={styles.menuContainer}>
        <TouchableHighlight onPress={() => console.log("Bruh1")}>
          <Image source={require("../../../assets/Quest-Map.png")} />
        </TouchableHighlight>
        <TouchableHighlight onPress={() => console.log("Bruh2")}>
          <Image source={require("../../../assets/BackPack-Map.png")} />
        </TouchableHighlight>
        <TouchableHighlight onPress={() => console.log("Bruh3")}>
          <Image source={require("../../../assets/Wizard-Map.png")} />
        </TouchableHighlight>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  buttonContainer: {
    position: "absolute",
    left: "2%",
    top: "7%",
    alignSelf: "flex-start",
  },
  popupContainer: {
    margin: 20,
    backgroundColor: "#241c54",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalButton: {
    backgroundColor: "#FF9051",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
  },
  modalButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 15,
    width: "100%",
  },
  modalButtonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  modalText: {
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: 0.25,
    color: "white",
  },
  menuContainer: {
    position: "absolute",
    bottom: "0%",
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#120733",
    opacity: 0.8,
    width: "100%",
  },
});
