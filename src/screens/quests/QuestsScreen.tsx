import { Image, StyleSheet, TouchableWithoutFeedback, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { UseNavigation } from '../../types/navigation'


export function QuestScreen() {
  const { goBack } = useNavigation<UseNavigation<'Quests'>>()

  return (
    <View style={styles.screen}>

      {/* Back button */}

      <View style={styles.returnAbs}>
        <TouchableWithoutFeedback
          onPress={() => goBack()}
          style={styles.touchable}
        >
          <View style={styles.touchableContent}></View>
        </TouchableWithoutFeedback>
      </View>

      {/* Fullscreen image */}

      <Image
        source={require('../../../assets/spell/spell_step_1.png') /* TODO use quests image */}
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
    // borderColor: '#ff0000',
    // borderWidth: 2,
    position: 'absolute',
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
  },
  returnAbs: {
    // borderColor: '#ff0000',
    // borderWidth: 2,
    position: "absolute",
    top: 32,
    left: 0,
    right: 0,
    height: 96,
    zIndex: 100,
    alignSelf: "flex-start",
  }
})
