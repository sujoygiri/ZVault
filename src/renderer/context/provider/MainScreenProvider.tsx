import { useState } from "react";
import { MainScreenContext, Menu } from "../mainScreenContext";
import { ChildrenProps } from "../../../shared/api.types";

export const MainScreenProvider = ({ children }: ChildrenProps) => {
    const [menu, setMenu] = useState<Menu>("Password");

    return (
        <MainScreenContext.Provider value={{ menu, setMenu }}>
            {children}
        </MainScreenContext.Provider>
    )
}