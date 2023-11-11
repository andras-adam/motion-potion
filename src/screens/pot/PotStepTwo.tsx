import { useNavigation } from "@react-navigation/native";
import { UseNavigation } from "../../types/navigation";
import { Movement } from "../../motionrecog/motion_recognition";
import { ImageScreen } from '../../components/ImageScreen'
import { useDetectMovement } from '../../hooks/useDetectMovement'

export function PotStepTwo() {
  const { navigate } = useNavigation<UseNavigation<"PotStepTwo">>();

  // Detect movement
  useDetectMovement({
    movement: Movement.circle,
    onComplete: () => navigate("PotStepThree")
  })

  return (
    <ImageScreen
      onPressBack={() => navigate('Map')}
      source={require('../../../assets/pot/pot_step_2.png')}
    />
  )
}
