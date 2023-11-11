import { useNavigation } from "@react-navigation/native";
import { UseNavigation } from "../../types/navigation";
import { Ingredient, useIngredients } from "../../contexts/IngredientContext";
import { useCallback } from "react";
import { ImageScreen } from '../../components/ImageScreen'

export function SpiceStepThree() {
  const { navigate } = useNavigation<UseNavigation<"SpellStepFive">>();

  const ingredients = useIngredients();

  const onSubmit = useCallback(() => {
    ingredients.collect(Ingredient.Chili);
    navigate("Map");
  }, [ingredients, navigate]);

  return (
    <ImageScreen
      action={() => navigate('SpiceSpellStepTwo')}
      onPressBack={onSubmit}
      source={require('../../../assets/spell/spice_spell_step_3.png')}
    />
  )
}
