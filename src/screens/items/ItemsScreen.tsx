import { useNavigation } from "@react-navigation/native";
import { UseNavigation } from "../../types/navigation";
import { ImageScreen } from "../../components/ImageScreen";
import { Ingredient, useIngredients } from "../../contexts/IngredientContext";

export function ItemsScreen() {
  const { goBack } = useNavigation<UseNavigation<"Items">>();

  const inventory = useIngredients().collected;

  let image;
  if (inventory.length == 0) {
    image = require("../../../assets/items/empty.png");
  } else if (inventory.length == 2) {
    image = require("../../../assets/items/both.png");
  } else if (inventory[0] == Ingredient.Chili) {
    image = require("../../../assets/items/chilli.png");
  } else if (inventory[0] == Ingredient.Pumpkin) {
    image = require("../../../assets/items/pumpkin.png");
  }

  return <ImageScreen onPressBack={goBack} source={image} />;
}
