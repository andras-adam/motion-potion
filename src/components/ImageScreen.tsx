import { Image, StyleSheet, View } from 'react-native'
import { HeaderBack } from './HeaderBack'
import { ActionButton } from './ActionButton'


interface ImageScreenProps {
  source: number
  onPressBack?: () => void
  action?: () => void
}

export function ImageScreen(props: ImageScreenProps) {
  return (
    <View style={styles.screen}>

      {/* Back button */}

      {props.onPressBack && (
        <HeaderBack onPress={props.onPressBack} />
      )}

      {/* Touchable hitbox for the image button */}

      {props.action && (
        <ActionButton onPress={props.action} />
      )}

      {/* Fullscreen image */}

      <Image
        source={props.source}
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

