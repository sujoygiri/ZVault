import { useState } from "react";
import { MainScreenContext, Menu } from "../mainScreenContext";
import { ChildrenProps } from "../../../shared/api.types";

export const MainScreenProvider = ({ children }: ChildrenProps) => {
    const [menu, setMenu] = useState<Menu>("Password");
    const [isAddDataOpen, setAddDataOpen] = useState(false);
    const [isSettingsOpen, setSettingsOpen] = useState(false);

    return (
        <MainScreenContext.Provider value={{ menu, setMenu, isAddDataOpen, setAddDataOpen, isSettingsOpen, setSettingsOpen }}>
            {children}
        </MainScreenContext.Provider>
    )
}