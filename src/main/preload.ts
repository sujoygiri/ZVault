import { contextBridge, ipcRenderer, IpcRendererEvent } from "electron/renderer";
import { AppActiveState, ApiResponse, Categories, CloudDrive, DataType, NewPassword, NewText, PasswordDetails, ResponsePayload, SortingOrder, TextDetails } from "../shared/api.types";

contextBridge.exposeInMainWorld("electronAPI", {
  onSystemThemeChange: (callback: (value: { isDarkMode: boolean }) => void) => ipcRenderer.on("onSystemThemeChange", (_event: IpcRendererEvent, value: { isDarkMode: boolean }) => callback(value)),
  onWindowStateChange: (callback: (value: AppActiveState) => void) => ipcRenderer.on("window:state", (_event: IpcRendererEvent, value: AppActiveState) => callback(value)),
  createNewVault: (password: string) => ipcRenderer.invoke("createNewVault", password),
  unlockVault: (password: string) => ipcRenderer.invoke("unlockVault", password),
  vaultExistStatus: () => ipcRenderer.invoke("vaultExistStatus"),
  addNewData: (data: NewPassword | NewText) => ipcRenderer.invoke("addNewData", data),
  deleteData: (id: string, type: DataType) => ipcRenderer.invoke("deleteData", id, type),
  editData: (updatedData: PasswordDetails | TextDetails) => ipcRenderer.invoke("editData", updatedData),
  decryptSensitiveData: (id: string, type: DataType) => ipcRenderer.invoke("decryptSensitiveData", id, type),
  fetchData: (type: DataType, pageNum: number, pageSize: number, sortingOrder: SortingOrder) => ipcRenderer.invoke("fetchData", type, pageNum, pageSize, sortingOrder),
  searchData: (category: Categories, searchInput: string, type: DataType, pageNum: number, pageSize: number, sortingOrder: SortingOrder): Promise<ResponsePayload> => ipcRenderer.invoke("searchData", category, searchInput, type, pageNum, pageSize, sortingOrder),
  getUserSettingsData: (): Promise<{ success: boolean; data: any; }> => ipcRenderer.invoke("getUserSettingsData"),
  setUserSettingsData: (settingsData: string): Promise<{ success: boolean; message: string;}> => ipcRenderer.invoke("setUserSettingsData", settingsData),
  exportVaultLocally: () => ipcRenderer.invoke("exportVaultLocally"),
  copyToClipBoard: (data: string): Promise<ApiResponse | undefined> => ipcRenderer.invoke("copyToClipBoard", data),

  openUrl: (url: string) => ipcRenderer.send("openUrl", url),
  
  
  connectToCloud: (cloudDrive: CloudDrive) => ipcRenderer.invoke("connectToCloud", cloudDrive),
  mergeGoogleCloudBackupFile: (backFileId: string, backFilename: string, masterPassword: string) => ipcRenderer.invoke("mergeGoogleCloudBackupFile", backFileId, backFilename, masterPassword),

  cloudSyncPasswordError: (callback: (errMessage: string) => void) => ipcRenderer.on("cloudSyncPasswordError", (_event: IpcRendererEvent, errorMsg: string) => callback(errorMsg)),
  cloudSyncPasswordSubmit: (password: string) => ipcRenderer.send("cloudSyncPasswordSubmit", password),
  cloudSyncPasswordCancel: () => ipcRenderer.send("cloudSyncPasswordCancel"),
  importCloudBackup: (masterPassword: string) => ipcRenderer.invoke("importCloudBackup", masterPassword),
  checkExistingBackup: () => ipcRenderer.invoke("checkExistingBackup"),
  checkTokenValidity: () => ipcRenderer.invoke("checkTokenValidity"),
  openLocalBackup: () => ipcRenderer.invoke("openLocalBackup"),
  backupToDrive: () => ipcRenderer.invoke("backupToDrive"),
  openCloudBackup: (backupFileId: string, backupFileName: string): Promise<{ success: boolean, message: string; }> => ipcRenderer.invoke("openCloudBackup", backupFileId, backupFileName),
});
