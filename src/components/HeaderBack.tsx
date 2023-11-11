import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native'


interface HeaderBackProps {
  onPress: () => void
}

export function HeaderBack({ onPress }: HeaderBackProps) {
  return (
    <View style={styles.container}>
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
  container: {
    // borderColor: '#ff0000',
    // borderWidth: 2,
    position: "absolute",
    top: 32,
    left: 0,
    width: 96,
    height: 96,
    zIndex: 100,
    alignSelf: "flex-start",
  },
  touchable: {
    flex: 1
  },
  touchableContent: {
    flex: 1
  }
})

