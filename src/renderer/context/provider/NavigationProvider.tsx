import { ChildrenProps } from "../../../shared/api.types";
import { NavigationContext, useNavigation } from "../navigationContext";
import { Screen } from "../../components/VaultNavigation";

export type NavigateFn = (screen: Screen) => void;

export function NavigationProvider({ children }: ChildrenProps) {
  const {
    canGoBack,
    goBack,
    navigate,
    replaceScreen,
    screen,
    navigationData,
    setNavigationData,
  } = useNavigation("startup");

  return (
    <NavigationContext.Provider
      value={{
        canGoBack: canGoBack,
        screen: screen,
        navigate: navigate,
        goBack: goBack,
        replaceScreen: replaceScreen,
        navigationData,
        setNavigationData,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
}
