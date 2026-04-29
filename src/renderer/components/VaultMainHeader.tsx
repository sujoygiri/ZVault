import { useContext } from "react";
import { MainScreenContext } from "../context/mainScreenContext";

export function VaultMainHeader() {
    const { menu, setAddDataOpen } = useContext(MainScreenContext);

    const getTitle = () => {
        switch (menu) {
            case "Password": return "Passwords";
            case "Text": return "Secure Notes";
            case "Setting": return "Settings";
            default: return "Vault";
        }
    };

    return (
         <header className="border-b h-20 border-slate-800 bg-[#08090d]/80 backdrop-blur-xl z-30 px-8 py-4 flex items-center justify-between">
            <h1 className="text-xl font-bold text-white">{getTitle()}</h1> 
            <div className="flex gap-4">
              <button onClick={() => setAddDataOpen(true)} className="bg-blue-600 cursor-pointer hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all">
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                Add Entry </button>
            </div>
          </header>
    )
}