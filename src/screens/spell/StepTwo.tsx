import { useNavigation } from "@react-navigation/native";
import { UseNavigation } from "../../types/navigation";
import { Movement } from "../../motionrecog/motion_recognition";
import { ImageScreen } from '../../components/ImageScreen'
import { useDetectMovement } from '../../hooks/useDetectMovement'

export function StepTwo() {
  const { navigate } = useNavigation<UseNavigation<"SpellStepTwo">>();

  // Detect movement
  useDetectMovement({
    movement: Movement.circle,
    onComplete: () => navigate("SpellStepThree")
  })

  return (
    <ImageScreen
      onPressBack={() => navigate('Map')}
      source={require('../../../assets/spell/spell_step_2.png')}
    />
  )
}
