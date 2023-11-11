import { Image, StyleSheet, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { UseNavigation } from '../../types/navigation'
import { HeaderBack } from '../../components/HeaderBack'
import { ActionButton } from '../../components/ActionButton'


export function SpiceStepOne() {
  const { navigate } = useNavigation<UseNavigation<'SpellStepOne'>>()

  return (
    <View style={styles.screen}>

      {/* Back button */}

      <HeaderBack onPress={() => navigate('Map')} />

      {/* Touchable hitbox for the image button */}

      <ActionButton onPress={() => navigate('SpiceSpellStepTwo')} />

      {/* Fullscreen image */}

      <Image
        source={require('../../../assets/spell/spice_spell_step_1.png')}
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
  image: {
    objectFit: 'cover',
    width: '100%',
    height: '100%'
  }
})
