// VaultScreen.tsx
import { useContext } from "react";
import { MainScreenProvider } from "../context/provider/MainScreenProvider";
import { VaultMainContent } from "./VaultMainContent";
import { VaultMainHeader } from "./VaultMainHeader";
import { VaultSidebar } from "./VaultSideBar";
import { AddData } from "./modal/AddData";
import { Settings } from "./modal/Settings";
import { MainScreenContext } from "../context/mainScreenContext";

function VaultScreenContent() {
  const { isAddDataOpen, setAddDataOpen, isSettingsOpen, setSettingsOpen } = useContext(MainScreenContext);

  return (
    <div className="flex min-h-screen w-full">
      <VaultSidebar/>
      <main className="flex-1 bg-[#0d1b2e] overflow-auto selection:bg-blue-500/30">
        <VaultMainHeader/>
        <VaultMainContent />
      </main>
      <AddData isOpen={isAddDataOpen} onClose={() => setAddDataOpen(false)} />
      <Settings isOpen={isSettingsOpen} onClose={() => setSettingsOpen(false)} />
    </div>
  );
}

export function VaultScreen() {
  return (
    <MainScreenProvider>
      <VaultScreenContent />
    </MainScreenProvider>
  );
}