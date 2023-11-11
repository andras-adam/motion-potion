import { useNavigation } from '@react-navigation/native'
import { UseNavigation } from '../../types/navigation'
import { ImageScreen } from '../../components/ImageScreen'


export function StepThree() {
  const { navigate } = useNavigation<UseNavigation<'SpellStepThree'>>()

  return (
    <ImageScreen
      action={() => navigate('SpellStepFour')}
      onPressBack={() => navigate('Map')}
      source={require('../../../assets/spell/spell_step_3.png')}
    />
  )
}
