import { Image, StyleSheet, TouchableWithoutFeedback, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { UseNavigation } from '../../types/navigation'


export function StepThree() {
  const { navigate } = useNavigation<UseNavigation<'SpellStepThree'>>()

  return (
    <View style={styles.screen}>

      {/* Touchable hitbox for the image button */}

      <View style={styles.absolute}>
        <TouchableWithoutFeedback
          onPress={() => navigate('SpellStepFour')}
          style={styles.touchable}
        >
          <View style={styles.touchableContent}></View>
        </TouchableWithoutFeedback>
      </View>

      {/* Fullscreen image */}

      <Image
        source={require('../../../assets/spell/spell_step_3.png')}
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
