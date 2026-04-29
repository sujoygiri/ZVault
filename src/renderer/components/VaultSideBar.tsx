import React, { useContext, useState } from "react";
import {
    LockIcon,
    PasswordIcon,
    SettingIcon,
    SidebarToggleIcon,
    TextIcon,
} from "./VaultIcons";
import { MainScreenContext, Menu } from "../context/mainScreenContext";

export type SidebarItem = {
    id: Menu;
    label: Menu;
    icon: React.ReactNode;
    iconStyle?: string;
    tooltipStyle?: string;
};

const sidebarTopMenu: SidebarItem[] = [
    { id: "Password", label: "Password", icon: <PasswordIcon />, iconStyle: "text-slate-500 hover:bg-slate-100 hover:text-slate-700", tooltipStyle: "bg-[#181a20] text-white" },
    { id: "Text", label: "Text", icon: <TextIcon />, iconStyle: "text-slate-500 hover:bg-slate-100 hover:text-slate-700", tooltipStyle: "bg-[#181a20] text-white" },
];
const sidebarBottomMenu: SidebarItem[] = [
    { id: "Setting", label: "Setting", icon: <SettingIcon />, iconStyle: "text-slate-500 hover:bg-slate-100 hover:text-slate-700", tooltipStyle: "bg-[#181a20] text-white" }
];

export function VaultSidebar() {
    const { menu, setMenu, setSettingsOpen } = useContext(MainScreenContext);

    const handelMenuSelect = (menuItem: Menu) => {
        setMenu(menuItem);
        if (menuItem === "Setting") {
            setSettingsOpen(true);
        }
    };

    return (
        <aside className="w-20 bg-[#0d0f14] border-r border-slate-800/50 h-screen flex flex-col items-center py-6 justify-between shadow-sm z-20">

            <div className="flex flex-col items-center w-full">

                <div className="mb-6 pb-6 border-b border-slate-100 w-full flex justify-center">
                    <div className="w-12 h-12 bg-slate-600 rounded-xl flex items-center justify-center text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" /></svg>
                    </div>
                </div>

                <nav className="flex flex-col gap-4">

                    {
                        sidebarTopMenu.map(menuItem => (
                            <div className="relative group" onClick={() => handelMenuSelect(menuItem.label)} key={menuItem.id}>
                                <button className={["w-12 h-12 cursor-pointer flex items-center justify-center rounded-2xl text-white shadow-md transition-all duration-200 hover:bg-blue-500 focus:outline-none", menuItem.id === menu ? "bg-blue-600" : menuItem.iconStyle].join(" ")}>
                                    {menuItem.icon}
                                </button>
                                <span className={["absolute left-full ml-4 top-1/2 -translate-y-1/2 px-3 py-1.5 text-[13px] font-semibold rounded-[10px] opacity-0 -translate-x-2 pointer-events-none transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 shadow-lg whitespace-nowrap z-50", menuItem.tooltipStyle].join(" ")}>
                                    {menuItem.label}
                                </span>
                            </div>

                        ))
                    }

                </nav>
            </div>

            <div className="flex flex-col gap-4">
                {
                    sidebarBottomMenu.map(menuItem => (
                        <div className="relative group" onClick={() => handelMenuSelect(menuItem.label)} key={menuItem.id}>
                            <button className={["w-12 h-12 cursor-pointer flex items-center justify-center rounded-2xl  transition-all duration-200 focus:outline-none", menuItem.id === menu ? "bg-blue-600" : menuItem.iconStyle].join(" ")}>
                                {menuItem.icon}
                            </button>
                            <span className={["absolute left-full ml-4 top-1/2 -translate-y-1/2 px-3 py-1.5 text-[13px] font-semibold rounded-[10px] opacity-0 -translate-x-2 pointer-events-none transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 shadow-lg whitespace-nowrap z-50", menuItem.tooltipStyle].join(" ")}>
                                {menuItem.label}
                            </span>
                        </div>

                    ))
                }

                <div className="relative group">
                    <button className="w-12 h-12 flex items-center justify-center hover:bg-red-50 text-red-500 rounded-2xl transition-all duration-200 focus:outline-none">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentcolor"><path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm0-80h480v-400H240v400Zm296.5-143.5Q560-327 560-360t-23.5-56.5Q513-440 480-440t-56.5 23.5Q400-393 400-360t23.5 56.5Q447-280 480-280t56.5-23.5ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM240-160v-400 400Z"/></svg>
                    </button>
                    <span className="absolute left-full ml-4 bg-red-600 text-white top-1/2 -translate-y-1/2 px-3 py-1.5 text-[13px] font-semibold rounded-[10px] opacity-0 -translate-x-2 pointer-events-none transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 shadow-lg whitespace-nowrap z-50">
                        Logout
                    </span>
                </div>

            </div>
        </aside>

    );
}
