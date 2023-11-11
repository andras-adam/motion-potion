import { Image, StyleSheet, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { UseNavigation } from '../../types/navigation'
import { useCallback } from 'react'
import { Ingredient, useIngredients } from '../../contexts/IngredientContext'
import { HeaderBack } from '../../components/HeaderBack'
import { ActionButton } from '../../components/ActionButton'


export function StepFive() {
  const { navigate } = useNavigation<UseNavigation<"SpellStepFive">>();

  const ingredients = useIngredients()

  const onSubmit = useCallback(() => {
    ingredients.collect(Ingredient.Pumpkin)
    navigate("Map")
  }, [ ingredients, navigate ])

  return (
    <View style={styles.screen}>

      {/* Back button */}

      <HeaderBack onPress={() => navigate('Map')} />

      {/* Touchable hitbox for the image button */}

      <ActionButton onPress={onSubmit} />

      {/* Fullscreen image */}

      <Image
        source={require("../../../assets/spell/spell_step_5.png")}
        style={styles.image}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    position: "relative",
    backgroundColor: "#000000",
  },
  image: {
    objectFit: "cover",
    width: "100%",
    height: "100%",
  },
});
