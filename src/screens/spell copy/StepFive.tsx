import {
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { UseNavigation } from "../../types/navigation";

export function StepFive() {
  const { navigate } = useNavigation<UseNavigation<"SpellStepFive">>();

  return (
    <View style={styles.screen}>
      <View style={styles.returnAbs}>
        <TouchableWithoutFeedback
          onPress={() => navigate('Map')}
          style={styles.touchable}
        >
          <View style={styles.touchableContent}></View>
        </TouchableWithoutFeedback>
      </View>
      {/* Touchable hitbox for the image button */}

      <View style={styles.absolute}>
        <TouchableWithoutFeedback
          onPress={() => navigate("Map")}
          style={styles.touchable}
        >
          <View style={styles.touchableContent}></View>
        </TouchableWithoutFeedback>
      </View>

      {/* Fullscreen image */}

      <Image
        source={require("../../../assets/spell/spell_step_5.png")}
        style={styles.image}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    position: "relative",
    backgroundColor: "#000000",
  },
  absolute: {
    position: "absolute",
    // borderColor: '#ff0000',
    // borderWidth: 2,
    bottom: 32,
    left: 16,
    right: 16,
    height: 96,
    zIndex: 100,
  },
  touchable: {
    flex: 1,
  },
  touchableContent: {
    flex: 1,
  },
  image: {
    objectFit: "cover",
    width: "100%",
    height: "100%",
  },
  returnAbs: {
    position: "absolute",
    top: 32,
    left: 0,
    right: 350,
    height: 96,
    zIndex: 100,
    alignSelf: "flex-start",
  },
});
