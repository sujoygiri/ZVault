import { drive_v3 } from "@googleapis/drive/build/v3";
import React from "react";

// render process type
export type ModalName = "backup_action" | "backup_list" | null;

export interface ChildrenProps {
  children?: React.ReactNode;
}

export interface ModalProp {
  onSetModalState: (isOpen: boolean, modalName: ModalName) => void;
}

// main process types
export type DataType = "password" | "text";
export type DataTables = "accounts" | "texts";
export type CloudDrive = "googleDrive" | "oneDrive" | "dropBox";
export type GoogleDriveFile = drive_v3.Schema$File;

declare global {
    interface Window {
        electronAPI: {
            createNewVault: (password: string) => Promise<ResponsePayload>,
            vaultExistStatus: () => Promise<boolean>,
            unlockVault: (password: string) => Promise<ResponsePayload>,
            addNewData: (data: NewPassword | NewText, pageNum: number, pageSize: number) => Promise<ResponsePayload>,
            deleteData: (id: string, type: DataType, pageNum: number, pageSize: number) => Promise<ResponsePayload>,
            editData: (updatedData: PasswordDetails | TextDetails, pageNum: number, pageSize: number) => Promise<ResponsePayload>
            decryptSensitiveData: (id: string, type: DataType) => Promise<string>,
            fetchData: (type: DataType, pageNum: number, pageSize: number) => Promise<ResponsePayload>,
            connectToCloud: (cloudDrive: CloudDrive, masterPassword: string) => Promise<any>,
            cloudSyncPasswordError: (callback: (errMessage: string) => void) => Electron.IpcRenderer,
            cloudSyncPasswordSubmit: (password: string) => void,
            cloudSyncPasswordCancel: () => void,
            importCloudBackup: (masterPassword: string) => Promise<any>,
            checkExistingBackup: () => Promise<{ isBackupPresent: boolean, data: drive_v3.Schema$File[], message: string }>,
            checkTokenValidity: () => Promise<{ isTokenValid: boolean, message: string }>,
            openLocalBackup: () => Promise<{ success: boolean, message: string }>,
            exportVault: () => Promise<{ success: boolean, message: string }>,
            backupToDrive: () => Promise<{ success: boolean, message: string }>,
            openCloudBackup: (backupFileId: string, backupFileName: string) => Promise<{ success: boolean; message: string }>
        }
    }
}

export interface ResponsePayload {
    rows: PasswordDetails[] | TextDetails[];
    totalEntries: number;
    type: "accounts" | "text";
}

export interface SensitiveData {
    usernameOrEmail: string,
    password: string,
    note: string
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
