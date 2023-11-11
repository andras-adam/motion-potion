import { useNavigation } from '@react-navigation/native'
import { UseNavigation } from '../../types/navigation'
import { ImageScreen } from '../../components/ImageScreen'


export function ItemsScreen() {
  const { goBack } = useNavigation<UseNavigation<'Items'>>()

  return (
    <ImageScreen
      onPressBack={goBack}
      source={require('../../../assets/spell/spell_step_1.png') /* TODO use items image */}
    />
  )
}
