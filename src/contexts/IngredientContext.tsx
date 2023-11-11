import { createContext, ReactNode, useCallback, useContext, useState } from 'react'


export enum Ingredient {
  Chili,
  Pumpkin
}

interface IIngredientContext {
  collected: Ingredient[]
  collect: (ingredient: Ingredient) => void
  use: (ingredient: Ingredient) => void
  has: (ingredient: Ingredient) => boolean
}

const IngredientContext = createContext<IIngredientContext | null>(null)

export function useIngredients() {
  const context = useContext(IngredientContext)
  if (!context) throw new Error('The useIngredients() hook was used outside of IngredientContextProvider.')
  return context
}

interface IngredientContextProviderProps {
  children: ReactNode
}

export function IngredientContextProvider({ children }: IngredientContextProviderProps) {

  const [ collected, setCollected ] = useState<Ingredient[]>([])

  const collect = useCallback((ingredient: Ingredient) => {
    setCollected(prev => [ ...new Set([ ...prev, ingredient ]) ])
  }, [])

  const use = useCallback((ingredient: Ingredient) => {
    setCollected(prev => prev.filter(i => i !== ingredient))
  }, [])

  const has = useCallback((ingredient: Ingredient) => {
    return collected.includes(ingredient)
  }, [ collected ])

  return (
    <IngredientContext.Provider value={{
      collected,
      collect,
      use,
      has
    }}>
      {children}
    </IngredientContext.Provider>
  )
}
