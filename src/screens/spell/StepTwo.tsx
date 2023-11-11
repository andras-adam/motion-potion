import { useCallback, useEffect, useRef, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import {
  InputDatum,
  Movement,
  detect_figure,
} from "../../motionrecog/motion_recognition";
import { DeviceMotion, DeviceMotionMeasurement } from "expo-sensors";
import { UseNavigation } from "../../types/navigation";
import { useNavigation } from "@react-navigation/native";
import Deque from "double-ended-queue";
import { Subscription } from "expo-sensors/build/Pedometer";

export function StepTwo() {
  const { navigate } = useNavigation<UseNavigation<"SpellStepTwo">>();
  // @ts-ignore
  const motionData = useRef<InputDatum[]>([]);
  const i = useRef<number>(0);

  const listenerRef = useRef<Subscription[]>([]);

  const handler = useCallback((data: DeviceMotionMeasurement) => {
    if (data.acceleration) {
      const datum = {
        ax: data.acceleration.x,
        ay: data.acceleration.y,
        az: data.acceleration.z,
        timestamp: data.interval,
      };

      motionData.current.push(datum);
      i.current += 1;
      if (motionData.current.length > 500) {
        motionData.current.shift();
      }
    }
    if (i.current % 20 == 0) {
      i.current = 0;
      let res = detect_figure(motionData.current);
      console.log();
      for (const movement of res) {
        if (movement == Movement.circle) {
          if (listenerRef.current.length > 0) {
            listenerRef.current[0].remove();
          }
          navigate("SpellStepThree");
        }
      }
    }
  }, []);

  let [started, setStarted] = useState(false);

  useEffect(() => {
    let a = async () => {
      await new Promise((resolve) => setTimeout(resolve, 300));
      setStarted(true);
    };
    a();
  });

  useEffect(() => {
    if (started) {
      DeviceMotion.setUpdateInterval(1);
      const listener = DeviceMotion.addListener(handler);
      listenerRef.current.push(listener);
      return () => listener.remove();
    }
  }, [started, handler]);

  useEffect(() => {
    (async () => {
      const response = await DeviceMotion.requestPermissionsAsync();
      if (!response.granted) {
        console.warn("Device motion permission not granted");
      }
    })();
  }, []);

  return (
    <View style={styles.screen}>
      <Image
        source={require("../../../assets/spell/spell_step_2.png")}
        style={styles.image}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    position: "relative",
  },
  image: {
    objectFit: "cover",
    width: "100%",
    height: "100%",
  },
  buttonContainer: {
    position: "absolute",
    zIndex: 100,
    backgroundColor: "#ffff00",
    height: 100,
    width: 100,
  },
  button: {
    backgroundColor: "#ffff00",
    height: 100,
    width: 100,
  },
});
