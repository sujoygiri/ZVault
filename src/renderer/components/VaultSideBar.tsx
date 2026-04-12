import React, { useContext, useState } from "react";
import {
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
};

const sidebarTopMenu: SidebarItem[] = [
  { id: "Password", label: "Password", icon: <PasswordIcon /> },
  { id: "Text", label: "Text", icon: <TextIcon /> },
  { id: "Setting", label: "Setting", icon: <SettingIcon /> },
];

export function VaultSidebar() {
  const {menu, setMenu} = useContext(MainScreenContext);

  const handelMenuSelect = (menu: Menu) => {
    setMenu(menu);
  };

  return (
        <aside className="w-20 bg-[#0d0f14] border-r border-slate-800/50 h-screen flex flex-col items-center py-6 justify-between shadow-sm z-20">
        
        <div className="flex flex-col items-center w-full">
            
            <div className="mb-6 pb-6 border-b border-slate-100 w-full flex justify-center">
                <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
                </div>
            </div>

            <nav className="flex flex-col gap-4">
                
                <div className="relative group" onClick={() => handelMenuSelect("Password")}>
                    <button className="w-12 h-12 flex items-center justify-center rounded-2xl bg-blue-500 text-white shadow-md transition-all duration-200 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                        <PasswordIcon/>
                    </button>
                    <span className="absolute left-full ml-4 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-[#181a20] text-white text-[13px] font-semibold rounded-[10px] opacity-0 -translate-x-2 pointer-events-none transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 shadow-lg whitespace-nowrap z-50">
                        Passwords
                    </span>
                </div>

                <div className="relative group"  onClick={() => handelMenuSelect("Text")}>
                    <button className="w-12 h-12 flex items-center justify-center rounded-2xl bg-blue-50 text-blue-500 transition-all duration-200 hover:bg-blue-100 focus:outline-none">
                        <TextIcon/>
                    </button>
                    <span className="absolute left-full ml-4 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-[#181a20] text-white text-[13px] font-semibold rounded-[10px] opacity-0 -translate-x-2 pointer-events-none transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 shadow-lg whitespace-nowrap z-50">
                        Texts
                    </span>
                </div>

                <div className="relative group">
                    <button className="w-12 h-12 flex items-center justify-center rounded-2xl bg-slate-100 text-slate-800 transition-all duration-200 hover:bg-slate-200 focus:outline-none">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                    </button>
                    <span className="absolute left-full ml-4 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-[#181a20] text-white text-[13px] font-semibold tracking-wide rounded-[10px] opacity-0 -translate-x-2 pointer-events-none transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 shadow-lg whitespace-nowrap z-50">
                        Security
                    </span>
                </div>

            </nav>
        </div>

        <div className="flex flex-col gap-4">
            <div className="relative group"  onClick={() => handelMenuSelect("Setting")}>
                <button className="w-12 h-12 flex items-center justify-center rounded-2xl text-slate-500 transition-all duration-200 hover:bg-slate-100 hover:text-slate-700 focus:outline-none">
                    <SettingIcon/>
                </button>
                <span className="absolute left-full ml-4 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-[#181a20] text-white text-[13px] font-semibold rounded-[10px] opacity-0 -translate-x-2 pointer-events-none transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 shadow-lg whitespace-nowrap z-50">
                    Settings
                </span>
            </div>

            <div className="relative group">
                <button className="w-12 h-12 flex items-center justify-center rounded-2xl text-red-500 transition-all duration-200 hover:bg-red-50 focus:outline-none">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                </button>
                <span className="absolute left-full ml-4 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-red-600 text-white text-[13px] font-semibold rounded-[10px] opacity-0 -translate-x-2 pointer-events-none transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 shadow-lg whitespace-nowrap z-50">
                    Logout
                </span>
            </div>

        </div>
    </aside>
    
  );
}
