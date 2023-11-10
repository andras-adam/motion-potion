import { NavigationProp, RouteProp } from '@react-navigation/native'


// Screens and their required parameters in this navigator
export type NavigatorParamList = {
  Home: undefined
}

// Helper type for useNavigation() hooks
export type UseNavigation<T extends keyof NavigatorParamList> =
  NavigationProp<NavigatorParamList, T>

// Helper type for useRoute() hooks
export type UseRoute<T extends keyof NavigatorParamList> =
  RouteProp<NavigatorParamList, T>
