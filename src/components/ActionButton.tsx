import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native'


interface ActionButtonProps {
  onPress: () => void
}

export function ActionButton({ onPress }: ActionButtonProps) {
  return (
    <View style={styles.absolute}>
      <TouchableWithoutFeedback
        onPress={onPress}
        style={styles.touchable}
      >
        <View style={styles.touchableContent}></View>
      </TouchableWithoutFeedback>
    </View>
  )
}

const styles = StyleSheet.create({
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
  }
})
