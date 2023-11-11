import { useNavigation } from "@react-navigation/native";
import { UseNavigation } from "../../types/navigation";
import { Movement } from "../../motionrecog/motion_recognition";
import { ImageScreen } from '../../components/ImageScreen'
import { useDetectMovement } from '../../hooks/useDetectMovement'

export function StepFour() {
  const { navigate } = useNavigation<UseNavigation<"SpellStepFour">>();

  // Detect movement
  useDetectMovement({
    movement: Movement.line_y,
    onComplete: () => navigate("SpellStepFive")
  })

  return (
    <ImageScreen
      onPressBack={() => navigate('Map')}
      source={require('../../../assets/spell/spell_step_4.png')}
    />
  )
}
