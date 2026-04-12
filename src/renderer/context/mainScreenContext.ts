import {createContext, useState} from "react";

export type Menu = "Password" | "Text" | "Setting";
type SetMenuFn = (menu: Menu) => void;

interface ContextValue {
    menu: Menu | null;
    setMenu: SetMenuFn;
}

export const MainScreenContext = createContext<ContextValue>({
    menu: null,
    setMenu: () => null
})