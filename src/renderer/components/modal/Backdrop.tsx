import React from "react";

interface BackdropProps{
    children: React.ReactNode
}
export function Backdrop({children}: BackdropProps) {
    return (
        <div className="flex fixed inset-0 items-center justify-center z-50 p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
            {children}
        </div>
    );
}