import { useNavigation } from "@react-navigation/native";
import { UseNavigation } from "../../types/navigation";
import { ImageScreen } from "../../components/ImageScreen";
import { Ingredient, useIngredients } from "../../contexts/IngredientContext";
import { useMemo } from 'react'

export function ItemsScreen() {
  const { goBack } = useNavigation<UseNavigation<"Items">>();

  const { collected } = useIngredients();

  const source = useMemo(() => {
    if (collected.length == 0) {
      return require("../../../assets/items/empty.png");
    } else if (collected.length == 2) {
      return require("../../../assets/items/both.png");
    } else if (collected[0] == Ingredient.Chili) {
      return require("../../../assets/items/chilli.png");
    } else if (collected[0] == Ingredient.Pumpkin) {
      return require("../../../assets/items/pumpkin.png");
    }
  }, [ collected ])

  return <ImageScreen onPressBack={goBack} source={source} />;
}
