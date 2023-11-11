import { useNavigation } from "@react-navigation/native";
import { UseNavigation } from "../../types/navigation";
import { Movement } from "../../motionrecog/motion_recognition";
import { ImageScreen } from '../../components/ImageScreen'
import { useDetectMovement } from '../../hooks/useDetectMovement'

export function SpiceStepTwo() {
  const { navigate } = useNavigation<UseNavigation<"SpellStepTwo">>();

  // Detect movement
  useDetectMovement({
    movement: Movement.line_x,
    onComplete: () => navigate("SpiceSpellStepThree")
  })

  return (
    <ImageScreen
      onPressBack={() => navigate('Map')}
      source={require('../../../assets/spell/spice_spell_step_2.png')}
    />
  )
}
