import { contextBridge, ipcRenderer, IpcRendererEvent } from "electron/renderer";
import {Categories, CloudDrive, DataType, NewPassword, NewText, PasswordDetails, ResponsePayload, SortingOrder, TextDetails} from "../shared/api.types"

contextBridge.exposeInMainWorld("electronAPI", {
  version: () => process.versions.node,
  createNewVault: (password: string) => ipcRenderer.invoke("createNewVault", password),
  unlockVault: (password: string) => ipcRenderer.invoke("unlockVault", password),
  vaultExistStatus: () => ipcRenderer.invoke("vaultExistStatus"),
  addNewData: (data: NewPassword | NewText) => ipcRenderer.invoke("addNewData", data),
  deleteData: (id: string, type: DataType) => ipcRenderer.invoke("deleteData", id, type),
  editData: (updatedData: PasswordDetails | TextDetails) => ipcRenderer.invoke("editData", updatedData),
  decryptSensitiveData: (id: string, type: DataType) => ipcRenderer.invoke("decryptSensitiveData", id, type),
  fetchData: (type: DataType, pageNum: number, pageSize: number) => ipcRenderer.invoke("fetchData", type, pageNum, pageSize),
  searchData: (category: Categories, searchInput: string, type: DataType, pageNum: number, pageSize: number, sortingOrder: SortingOrder): Promise<ResponsePayload> => ipcRenderer.invoke("searchData", category, searchInput, type, pageNum, pageSize, sortingOrder),
  connectToCloud: (cloudDrive: CloudDrive) => ipcRenderer.invoke("connectToCloud", cloudDrive),
  mergeGoogleCloudBackupFile: (backFileId: string, backFilename: string, masterPassword: string) => ipcRenderer.invoke("mergeGoogleCloudBackupFile", backFileId, backFilename, masterPassword),
  exportVaultLocally: () => ipcRenderer.invoke("exportVaultLocally"),
  

  cloudSyncPasswordError: (callback: (errMessage: string) => void) => ipcRenderer.on("cloudSyncPasswordError", (_event: IpcRendererEvent, errorMsg: string) => callback(errorMsg)),
  cloudSyncPasswordSubmit: (password: string) => ipcRenderer.send("cloudSyncPasswordSubmit", password),
  cloudSyncPasswordCancel: () => ipcRenderer.send("cloudSyncPasswordCancel"),
  importCloudBackup: (masterPassword: string) => ipcRenderer.invoke("importCloudBackup", masterPassword),
  checkExistingBackup: () => ipcRenderer.invoke("checkExistingBackup"),
  checkTokenValidity: () => ipcRenderer.invoke("checkTokenValidity"),
  openLocalBackup: () => ipcRenderer.invoke("openLocalBackup"),
  backupToDrive: () => ipcRenderer.invoke("backupToDrive"),
  openCloudBackup: (backupFileId: string, backupFileName: string): Promise<{ success: boolean, message: string }> => ipcRenderer.invoke("openCloudBackup", backupFileId, backupFileName),
});
