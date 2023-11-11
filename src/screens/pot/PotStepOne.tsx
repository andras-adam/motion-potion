import { useNavigation } from '@react-navigation/native'
import { UseNavigation } from '../../types/navigation'
import { ImageScreen } from '../../components/ImageScreen'


export function PotStepOne() {
  const { navigate } = useNavigation<UseNavigation<'PotStepOne'>>()

  return (
    <ImageScreen
      action={() => navigate('PotStepTwo')}
      onPressBack={() => navigate('Map')}
      source={require('../../../assets/spell/pot_step_1.png')}
    />
  )
}
