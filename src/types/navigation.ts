import { NavigationProp, RouteProp } from "@react-navigation/native";


// Screens and their required parameters in this navigator
export type NavigatorParamList = {
  Map: undefined
  // Map tab bar items
  Quests: undefined
  Items: undefined
  Profile: undefined
  // Spell flow
  SpellStepOne: undefined
  SpellStepTwo: undefined
  SpellStepThree: undefined
  SpellStepFour: undefined
  SpellStepFive: undefined
  // Spice flow
  SpiceSpellStepOne: undefined
  SpiceSpellStepTwo: undefined
  SpiceSpellStepThree: undefined
  // Pot flow
  PotStepOne: undefined
  PotStepTwo: undefined
  PotStepThree: undefined
  // Legacy
  Home: undefined
  Debug: undefined
}

// Helper type for useNavigation() hooks
export type UseNavigation<T extends keyof NavigatorParamList> = NavigationProp<
  NavigatorParamList,
  T
>;

// Helper type for useRoute() hooks
export type UseRoute<T extends keyof NavigatorParamList> = RouteProp<
  NavigatorParamList,
  T
>;
