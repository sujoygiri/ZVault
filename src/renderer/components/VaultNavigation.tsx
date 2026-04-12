import { useContext } from "react";

import { VaultStartupScreen } from "./VaultStartupScreen";
import { VaultUnlockScreen } from "./VaultUnlockScreen";
import VaultCreate from "./VaultCreate";
import { VaultScreen } from "./VaultMainScreen";
import { NavigationContext } from "../context/navigationContext";
import { CloudBackupActionModal } from "./modal/CloudBackupAction";
import { CloudBackupListModal } from "./modal/CloudBackupList";

export type Screen =
  | "startup"
  | "unlock"
  | "create"
  | "vault"
  | "settings"
  | "backup_action"
  | "backup_list";

export function VaultNavigation() {
  const {screen} = useContext(NavigationContext);
  switch (screen) {
    case "startup":
      return <VaultStartupScreen />;
    case "unlock":
      return <VaultUnlockScreen />;
    case "create":
      return <VaultCreate />;
    case "vault":
      return <VaultScreen />;
    case "settings":
      return 1;
    case "backup_action":
      return <CloudBackupActionModal/>;
    case "backup_list":
      return <CloudBackupListModal/>;
    default:
      break;
  }
}
