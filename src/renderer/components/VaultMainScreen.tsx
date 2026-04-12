// VaultScreen.tsx
import { MainScreenProvider } from "../context/provider/MainScreenProvider";
import { VaultMainContent } from "./VaultMainContent";
import { VaultSidebar } from "./VaultSideBar";

export function VaultScreen() {
  return (
    <MainScreenProvider>
      <div className="flex min-h-screen w-full">
        <VaultSidebar
        // activeId="passwords"
        // onSelect={(id) => console.log("selected:", id)}
        // onSettings={onSettings}
        />

        {/* Main content area */}
        <main className="flex-1 bg-[#0d1b2e] overflow-auto p-4 md:p-8 selection:bg-blue-500/30">
          {<VaultMainContent />}
        </main>
      </div>
    </MainScreenProvider>
  );
}