import { Image, StyleSheet, TouchableWithoutFeedback, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { UseNavigation } from '../../types/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import { detect_figure, InputDatum, Movement } from '../../motionrecog/motion_recognition'
import { Subscription } from 'expo-sensors/build/Pedometer'
import { DeviceMotion, DeviceMotionMeasurement } from 'expo-sensors'


export function StepFour() {
  const { navigate } = useNavigation<UseNavigation<'SpellStepFour'>>()

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
        if (movement == Movement.line_y) {
          if (listenerRef.current.length > 0) {
            listenerRef.current[0].remove();
          }
          navigate("SpellStepFive");
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

      {/* Touchable hitbox for the image button */}

      {/*<View style={styles.absolute}>*/}
      {/*  <TouchableWithoutFeedback*/}
      {/*    onPress={() => navigate('SpellStepFive')}*/}
      {/*    style={styles.touchable}*/}
      {/*  >*/}
      {/*    <View style={styles.touchableContent}></View>*/}
      {/*  </TouchableWithoutFeedback>*/}
      {/*</View>*/}

      {/* Fullscreen image */}

      <Image
        source={require('../../../assets/spell/spell_step_4.png')}
        style={styles.image}
      />

    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#000000'
  },
  absolute: {
    position: 'absolute',
    // borderColor: '#ff0000',
    // borderWidth: 2,
    bottom: 32,
    left: 16,
    right: 16,
    height: 96,
    zIndex: 100
  },
  touchable: {
    flex: 1
  },
  touchableContent: {
    flex: 1
  },
  image: {
    objectFit: 'cover',
    width: '100%',
    height: '100%'
  }
})
