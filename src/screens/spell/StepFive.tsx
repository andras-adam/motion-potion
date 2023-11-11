import { useNavigation } from '@react-navigation/native'
import { UseNavigation } from '../../types/navigation'
import { useCallback } from 'react'
import { Ingredient, useIngredients } from '../../contexts/IngredientContext'
import { ImageScreen } from '../../components/ImageScreen'


export function StepFive() {
  const { navigate } = useNavigation<UseNavigation<"SpellStepFive">>();

  const ingredients = useIngredients()

  const onSubmit = useCallback(() => {
    ingredients.collect(Ingredient.Pumpkin)
    navigate("Map")
  }, [ ingredients, navigate ])

  return (
    <ImageScreen
      action={onSubmit}
      onPressBack={() => navigate('Map')}
      source={require('../../../assets/spell/spell_step_5.png')}
    />
  )
}
