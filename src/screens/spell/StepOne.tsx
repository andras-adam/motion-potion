import { useNavigation } from '@react-navigation/native'
import { UseNavigation } from '../../types/navigation'
import { ImageScreen } from '../../components/ImageScreen'


export function StepOne() {
  const { navigate } = useNavigation<UseNavigation<'SpellStepOne'>>()

  return (
    <ImageScreen
      action={() => navigate('SpellStepTwo')}
      onPressBack={() => navigate('Map')}
      source={require('../../../assets/spell/spell_step_1.png')}
    />
  )
}
