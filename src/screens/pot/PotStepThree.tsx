import { useNavigation } from "@react-navigation/native";
import { UseNavigation } from "../../types/navigation";
import { ImageScreen } from '../../components/ImageScreen'

export function PotStepThree() {
  const { navigate } = useNavigation<UseNavigation<"PotStepThree">>();

  return (
    <ImageScreen
      action={() => navigate('Map')}
      onPressBack={() => navigate('Map')}
      source={require('../../../assets/pot/pot_step_3.png')}
    />
  )
}
