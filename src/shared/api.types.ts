/// <reference types="electron" />

import { drive_v3 } from "googleapis";
// render process type
export type Categories = 'General' | 'Work' | 'Personal' | 'Finance' | 'Social' | 'Entertainment' | '';
export type ModalName = "backup_action" | "backup_list" | null;
export type SortingOrder = "name_asc" | "name_desc" | "date_asc" | "date_desc";

// main process types
export type DataType = "password" | "text";
export type DataTables = "accounts" | "texts";
export type CloudDrive = "googleDrive" | "oneDrive" | "dropBox" | "none";
export type GoogleDriveFile = drive_v3.Schema$File;

export interface IElectronAPI {
    createNewVault: (password: string) => Promise<{ success: boolean, message: string; }>,
    vaultExistStatus: () => Promise<boolean>,
    unlockVault: (password: string) => Promise<{ success: boolean, message: string; }>,
    addNewData: (data: NewPassword | NewText) => Promise<{ success: boolean, message: string; }>,
    deleteData: (id: string, type: DataType) => Promise<{ success: boolean, message: string; }>,
    editData: (updatedData: PasswordDetails | TextDetails) => Promise<{ success: boolean, message: string; }>;
    decryptSensitiveData: (id: string, type: DataType) => Promise<string>,
    fetchData: (type: DataType, pageNum: number, pageSize: number) => Promise<ResponsePayload>,
    searchData: (category: Categories, searchInput: string, type: DataType, pageNum: number, pageSize: number, sortingOrder: SortingOrder) => Promise<ResponsePayload>,
    getUserSettingsData: () => Promise<{ success: boolean;data: any;}>,
    setUserSettingsData: (settingsData: string) => Promise<{success: boolean;message: string;}>,
    connectToCloud: (cloudDrive: CloudDrive) => Promise<{ isBackupPresent: boolean; data: drive_v3.Schema$File[] | null; message: string; } | undefined>,
    mergeGoogleCloudBackupFile: (backFileId: string, backFilename: string, masterPassword: string) => Promise<any>,
    exportVaultLocally: () => Promise<{ success: boolean, message: string; }>,
    openUrl: (url: string) => void,


    cloudSyncPasswordError: (callback: (errMessage: string) => void) => Electron.IpcRenderer,
    cloudSyncPasswordSubmit: (password: string) => void,
    cloudSyncPasswordCancel: () => void,
    importCloudBackup: (masterPassword: string) => Promise<any>,
    checkExistingBackup: () => Promise<{ isBackupPresent: boolean, data: drive_v3.Schema$File[], message: string; }>,
    checkTokenValidity: () => Promise<{ isTokenValid: boolean, message: string; }>,
    openLocalBackup: () => Promise<{ success: boolean, message: string; }>,
    backupToDrive: () => Promise<{ success: boolean, message: string; }>,
    openCloudBackup: (backupFileId: string, backupFileName: string) => Promise<{ success: boolean, message: string; }>;
}

declare global {
    interface Window {
        electronAPI?: IElectronAPI;
    }
}

export interface ApiResponse {
    success: boolean;
    message?: string;
    data?: any | null;
}

export interface ResponsePayload {
    rows: PasswordDetails[] | TextDetails[];
    totalEntries: number;
    type: "accounts" | "text";
}

export interface SensitivePasswordData {
    usernameOrEmail: string,
    password: string,
    note: string;
}

export interface NewPassword {
    title: string;
    usernameOrEmail: string;
    password: string;
    category: string;
    url: string;
    note: string;
    type: "password";
}

export interface PasswordDetails extends NewPassword {
    id: string;
    icon_hint: string;
    is_favorite: boolean;
    last_modified: string;
}

export interface NewText {
    title: string;
    content: string;
    category: string;
    type: "text";
}

export interface TextDetails extends NewText {
    id: string;
    is_favorite: boolean;
    last_modified: string;
}
