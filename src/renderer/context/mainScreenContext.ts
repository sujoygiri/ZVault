import {createContext, useState} from "react";

export type Menu = "Password" | "Text" | "Setting";
type SetMenuFn = (menu: Menu) => void;

interface ContextValue {
    menu: Menu | null;
    setMenu: SetMenuFn;
    isAddDataOpen: boolean;
    setAddDataOpen: (open: boolean) => void;
    isSettingsOpen: boolean;
    setSettingsOpen: (open: boolean) => void;
}

export const MainScreenContext = createContext<ContextValue>({
    menu: null,
    setMenu: () => null,
    isAddDataOpen: false,
    setAddDataOpen: () => null,
    isSettingsOpen: false,
    setSettingsOpen: () => null
})