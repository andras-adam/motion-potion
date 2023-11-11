import { Image, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'


export function StepOne() {
  return (
    <View style={styles.screen}>
      <TouchableWithoutFeedback style={styles.buttonContainer}>
        <View style={styles.button}>
          <Text>Hello</Text>
        </View>
      </TouchableWithoutFeedback>
      <Image
        source={require('../../../assets/spell/spell_step_1.png')}
        style={styles.image}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    position: 'relative'
  },
  image: {
    objectFit: 'cover',
    width: '100%',
    height: '100%'
  },
  buttonContainer: {
    position: 'absolute',
    zIndex: 100,
    backgroundColor: '#ffff00',
    height: 100,
    width: 100
  },
  button: {
    backgroundColor: '#ffff00',
    height: 100,
    width: 100
  }
})
