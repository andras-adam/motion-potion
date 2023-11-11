import { DeviceMotion, DeviceMotionMeasurement } from 'expo-sensors'
import { useCallback, useEffect, useState } from 'react'
import { Button, StyleSheet, View } from 'react-native'


const SIZE = 300

function mockCalc({ x, y }: { x: number; y: number; z: number; dt: number }) {
  return { x, y }
}

export function OtherScreen() {

  const [ started, setStarted ] = useState(false)

  const [ entries, setEntries ] = useState<{ x: number; y: number }[]>([])

  const handler = useCallback((data: DeviceMotionMeasurement) => {
    if (data.acceleration) {
      console.log(data.acceleration)
      const newData = mockCalc({ ...data.acceleration, dt: data.interval })
      // setEntries(prev => [ ...prev, newData ])
    }
  }, [])

  useEffect(() => {
    if (started) {
      DeviceMotion.setUpdateInterval(100)
      const listener = DeviceMotion.addListener(handler)
      return () => listener.remove()
    }
  }, [ started, handler ])

  useEffect(() => {
    (async () => {
      const response = await DeviceMotion.requestPermissionsAsync()
      if (!response.granted) {
        console.warn('Device motion permission not granted')
      }
    })()
  }, [])

  return (
    <View style={styles.container}>

      <View style={styles.controls}>
        <Button title="Start" onPress={() => setStarted(true)} />
        <Button title="Stop" onPress={() => setStarted(false)} />
        <Button title="Reset" onPress={() => setEntries([])} />
      </View>

      <View style={[
        styles.canvas,
        {
          height: SIZE,
          width: SIZE
        }
      ]}>

        {entries.map((entry, index) => (
          <View key={index} style={[
            styles.point,
            {
              bottom: entry.y * SIZE,
              left: entry.x * SIZE
            }
          ]}/>
        ))}

      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20
  },
  controls: {
    flexDirection: 'row',
    gap: 20
  },
  canvas: {
    margin: 20,
    position: 'relative',
    backgroundColor: 'white'
  },
  point: {
    backgroundColor: '#ff0000',
    height: 4,
    width: 4,
    borderRadius: 2,
    position: 'absolute'
  }
})
