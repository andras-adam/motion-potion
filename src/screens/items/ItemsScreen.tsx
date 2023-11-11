import { Image, StyleSheet, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { UseNavigation } from '../../types/navigation'
import { HeaderBack } from '../../components/HeaderBack'


export function ItemsScreen() {
  const { goBack } = useNavigation<UseNavigation<'Items'>>()

  return (
    <View style={styles.screen}>

      {/* Back button */}

      <HeaderBack onPress={goBack} />

      {/* Fullscreen image */}

      <Image
        source={require('../../../assets/spell/spell_step_1.png') /* TODO use items image */}
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
