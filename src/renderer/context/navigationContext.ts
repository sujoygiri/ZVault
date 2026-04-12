import { createContext, useState } from "react";
import { NavigateFn } from "./provider/NavigationProvider";
import { Screen } from "../components/VaultNavigation";
import { GoogleDriveFile, ResponsePayload } from "../../shared/api.types";

interface ContextValue {
  canGoBack: boolean;
  screen: Screen | null;
  navigate: NavigateFn;
  goBack: () => void;
  replaceScreen: NavigateFn;
  navigationData: GoogleDriveFile[] | ResponsePayload,
  setNavigationData: (data: GoogleDriveFile[] | ResponsePayload) => void,
}

export const NavigationContext = createContext<ContextValue>({
  canGoBack: false,
  screen: null,
  navigationData: [],
  navigate: () => {},
  goBack: () => {},
  replaceScreen: () => {},
  setNavigationData: () => {},
});

export function useNavigation(initial: Screen) {
  const [screenStack, setScreenStack] = useState<Screen[]>([initial]);
  const [navigationData, setData] = useState<GoogleDriveFile[]|ResponsePayload>([])
  const navigate = (screen: Screen) =>  setScreenStack((prevScreen) => [...prevScreen, screen]);
  const goBack = () =>
    setScreenStack((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev));
  const replaceScreen = (screen: Screen) =>
    setScreenStack((prev) => [...prev.slice(0, -1), screen]);
  const setNavigationData = (data: GoogleDriveFile[] | ResponsePayload) => setData(data);
  return {
    screen: screenStack[screenStack.length - 1],
    canGoBack: screenStack.length > 1,
    navigate,
    goBack,
    replaceScreen,
    navigationData,
    setNavigationData
  };
}