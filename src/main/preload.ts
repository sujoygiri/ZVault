import { drive_v3 } from "@googleapis/drive/build/v3";
import { contextBridge, ipcRenderer, IpcRendererEvent } from "electron/renderer";

declare global {
  type DataType = "password" | "text";
  type DataTables = "accounts" | "texts";
  type CloudDrive = "googleDrive" | "oneDrive" | "dropBox";
  type GoogleDriveFileList = drive_v3.Schema$File[];
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
      importBackup: (masterPassword: string) => Promise<any>,
      checkExistingBackup: () => Promise<{ isBackupPresent: boolean, data: drive_v3.Schema$File[], message: string }>,
      checkTokenValidity: () => Promise<{ isTokenValid: boolean, message: string }>,
      openLocalBackup: () => Promise<{ success: boolean, message: string }>,
      exportVault: () => Promise<{ success: boolean, message: string }>,
      backupToDrive: () => Promise<{ success: boolean, message: string }>,
      openCloudBackup: (backupFileId: string, backupFileName: string) => Promise<{ success: boolean; message: string }>
    }
  }

  interface ResponsePayload {
    rows: PasswordDetails[] | TextDetails[];
    totalEntries: number;
    type: "accounts" | "text";
  }

  interface SensitiveData {
    usernameOrEmail: string,
    password: string,
    note: string
  }

  interface NewPassword {
    title: string;
    usernameOrEmail: string;
    password: string;
    category: string;
    url: string;
    note: string;
    type: "password";
  }

  interface PasswordDetails extends NewPassword {
    id: string;
    icon_hint: string;
    is_favorite: boolean;
    last_modified: string;
  }

  interface NewText {
    title: string;
    content: string;        // can contain \n for multi-line
    category: string;
    type: "text";
  }

  interface TextDetails extends NewText {
    id: string;
    is_favorite: boolean;
    last_modified: string;
  }

}

contextBridge.exposeInMainWorld("electronAPI", {
  version: () => process.versions.node,
  createNewVault: (password: string) => ipcRenderer.invoke("createNewVault", password),
  unlockVault: (password: string) => ipcRenderer.invoke("unlockVault", password),
  vaultExistStatus: () => ipcRenderer.invoke("vaultExistStatus"),
  addNewData: (
    data: NewPassword | NewText,
    pageNum: number,
    pageSize: number
  ) => ipcRenderer.invoke("addNewData", data, pageNum, pageSize),
  deleteData: (id: string, type: DataType, pageNum: number, pageSize: number) => ipcRenderer.invoke("deleteData", id, type, pageNum, pageSize),
  editData: (updatedData: PasswordDetails | TextDetails, pageNum: number, pageSize: number) => ipcRenderer.invoke("editData", updatedData, pageNum, pageSize),
  decryptSensitiveData: (id: string, type: DataType) => ipcRenderer.invoke("decryptSensitiveData", id, type),
  fetchData: (type: DataType, pageNum: number, pageSize: number) => ipcRenderer.invoke("fetchData", type, pageNum, pageSize),
  connectToCloud: (cloudDrive: CloudDrive, masterPassword: string) => ipcRenderer.invoke("connectToCloud", cloudDrive, masterPassword),
  cloudSyncPasswordError: (callback: (errMessage: string) => void) => ipcRenderer.on("cloudSyncPasswordError", (_event: IpcRendererEvent, errorMsg: string) => callback(errorMsg)),
  cloudSyncPasswordSubmit: (password: string) => ipcRenderer.send("cloudSyncPasswordSubmit", password),
  cloudSyncPasswordCancel: () => ipcRenderer.send("cloudSyncPasswordCancel"),
  importBackup: (masterPassword: string) => ipcRenderer.invoke("importBackup", masterPassword),
  checkExistingBackup: () => ipcRenderer.invoke("checkExistingBackup"),
  checkTokenValidity: () => ipcRenderer.invoke("checkTokenValidity"),
  openLocalBackup: () => ipcRenderer.invoke("openLocalBackup"),
  exportVault: () => ipcRenderer.invoke("exportVault"),
  backupToDrive: () => ipcRenderer.invoke("backupToDrive"),
  openCloudBackup: (backupFileId: string, backupFileName: string): Promise<{ success: boolean, message: string }> => ipcRenderer.invoke("openCloudBackup", backupFileId, backupFileName),
});
