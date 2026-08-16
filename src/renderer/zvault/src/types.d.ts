declare global {
    interface Window {
        electronAPI?: import("@zvault/shared-api").IElectronAPI;
    }
}

export {}