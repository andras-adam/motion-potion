import { DeviceMotion, DeviceMotionMeasurement } from "expo-sensors";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button, StyleSheet, View } from "react-native";
import {
  InputDatum,
  detect_figure,
} from "../../motionrecog/motion_recognition";

const SIZE = 300;

export function DebugScreen() {
  const [started, setStarted] = useState(false);

  const [entries, setEntries] = useState<{ x: number; y: number }[]>([]);

  const motionData = useRef<InputDatum[]>([]);

  const handler = useCallback((data: DeviceMotionMeasurement) => {
    if (data.acceleration) {
      const datum = {
        ax: data.acceleration.x,
        ay: data.acceleration.y,
        az: data.acceleration.z,
        timestamp: data.interval,
      };

      motionData.current.push(datum);
    }
    if (motionData.current.length % 20 == 0) {
      // let res = detect_figure(motionData.current).map((pos) => ({
      //   x: pos.ax / 8 + 0.5,
      //   y: -pos.ay / 8 + 0.5,
      // }));
      // setEntries(res);
    }
  }, []);

  useEffect(() => {
    if (started) {
      DeviceMotion.setUpdateInterval(1);
      const listener = DeviceMotion.addListener(handler);
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
    <View style={styles.container}>
      <View style={styles.controls}>
        <Button title="Start" onPress={() => setStarted(true)} />
        <Button title="Stop" onPress={() => setStarted(false)} />
        <Button
          title="Reset"
          onPress={() => {
            motionData.current = [];
            setEntries([]);
          }}
        />
      </View>

      <View
        style={[
          styles.canvas,
          {
            height: SIZE,
            width: SIZE,
          },
        ]}
      >
        {entries.map((entry, index) => (
          <View
            key={index}
            style={[
              styles.point,
              {
                bottom: entry.y * SIZE,
                left: entry.x * SIZE,
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 20,
  },
  controls: {
    flexDirection: "row",
    gap: 20,
  },
  canvas: {
    margin: 20,
    position: "relative",
    backgroundColor: "white",
  },
  point: {
    backgroundColor: "#ff0000",
    height: 4,
    width: 4,
    borderRadius: 2,
    position: "absolute",
  },
});
