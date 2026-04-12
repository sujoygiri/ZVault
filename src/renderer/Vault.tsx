import Background from "./components/VaultBackground";
import { VaultNavigation } from "./components/VaultNavigation";
import { NavigationProvider } from "./context/provider/NavigationProvider";

export default function Vault() {
  return (
    // <ThemeProvider>
    <Background>
      <NavigationProvider>
        <VaultNavigation />
      </NavigationProvider>
    </Background>
    // </ThemeProvider>
  );
}
