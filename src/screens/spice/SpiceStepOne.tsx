import { useNavigation } from '@react-navigation/native'
import { UseNavigation } from '../../types/navigation'
import { ImageScreen } from '../../components/ImageScreen'


export function SpiceStepOne() {
  const { navigate } = useNavigation<UseNavigation<'SpellStepOne'>>()

  return (
    <ImageScreen
      action={() => navigate('SpiceSpellStepTwo')}
      onPressBack={() => navigate('Map')}
      source={require('../../../assets/spell/spice_spell_step_1.png')}
    />
  )
}
