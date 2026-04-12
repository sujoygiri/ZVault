import { useContext, useState } from "react";
import { Backdrop } from "./Backdrop";
import { NavigationContext } from "../../context/navigationContext";
import { GoogleDriveFile } from "../../../shared/api.types";
import VaultButton from "../VaultButton";
import { DownloadIcon, LoadingIcon, XIcon } from "../VaultIcons";

function getFileSize(size: string) {
  const sizeInNumber = parseInt(size);
  if (sizeInNumber <= 0) {
    return "0 KB";
  }
  let sizeInKB = Number((sizeInNumber / 1024).toFixed(1));
  let sizeInMB = Number((sizeInKB / 1024).toFixed(1));
  let sizeInGB = Number((sizeInMB / 1024).toFixed(1));
  return sizeInGB
    ? sizeInGB + " GB"
    : sizeInMB
      ? sizeInMB + " MB"
      : sizeInKB
        ? sizeInKB + " KB"
        : "0 KB";
}

function getDaysAgo(date: string) {
  const now = new Date();
  const past = new Date(date);
  const diffTime = Math.abs(now.getTime() - past.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

export function CloudBackupListModal() {
  const { canGoBack, goBack, navigate, replaceScreen, navigationData } =
    useContext(NavigationContext);
  const [selectedBackup, setSelectedBackup] = useState<GoogleDriveFile>();
  const [isLoading, setIsLoading] = useState(false);

  const handelBackupSelect = (backup: GoogleDriveFile) => {
    console.log(backup);
    setSelectedBackup(backup);
  };
  const handelBackupImport = async () => {
    setIsLoading(true);
    const cloudImportResponse = await window.electronAPI.openCloudBackup(selectedBackup?.id ?? "", selectedBackup?.name ?? "");
    setIsLoading(false);
    if(cloudImportResponse.success){
      replaceScreen("unlock");
    }
  }
  return (
    <Backdrop>
      <div className="relative vault-theme rounded-3xl w-full max-w-135 flex flex-col z-20 bg-black border border-slate-700/60 max-h-[85vh]">
        <button
          id="close-modal-btn"
          className="absolute cursor-pointer top-5 right-5 text-slate-400 hover:text-white transition focus:outline-none p-1 rounded-full hover:bg-slate-800/50"
          onClick={() => navigate("startup")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 -960 960 960"
            width="24"
            fill="currentColor"
          >
            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
          </svg>
        </button>

        <div className="px-7 pt-7 pb-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="text-blue-400 bg-blue-500/10 p-1.5 rounded-lg border border-blue-500/20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 -960 960 960"
                width="24"
                fill="currentColor"
              >
                <path d="M320-240h320v-80H320v80Zm0-160h320v-80H320v80ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Select a Backup
            </h2>
          </div>
          <p className="text-slate-400 text-sm">
            Choose a backup file to restore your data from.
          </p>
        </div>

        <div className="px-7 py-2 overflow-y-auto custom-scrollbar flex flex-col gap-3 flex-1 mb-2">
          {Array.isArray(navigationData) && navigationData.map((backup) => (
            <label key={backup.id} className="group relative cursor-pointer">
              <input
                type="radio"
                name="backup_selection"
                value={backup.id ?? ""}
                className="hidden"
                checked={selectedBackup?.id === backup.id}
                onChange={() => handelBackupSelect(backup)}
              />
              <div className="border border-slate-700/60 bg-slate-800/30 rounded-2xl p-4 flex items-center justify-between transition-all group-has-checked:border-blue-500/60 group-has-checked:bg-blue-500/5 hover:border-slate-500/50">
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-200 font-medium group-hover:text-white transition-colors">
                      {backup.name}
                    </span>
                    {/* <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide border ${backup.badgeClasses}`}
                  >
                    {backup.type}
                  </span> */}
                  </div>
                  <div className="flex items-center gap-4 text-[13px] text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="14"
                        viewBox="0 -960 960 960"
                        width="14"
                        fill="currentColor"
                      >
                        <path d="M280-280h400v-80H280v80Zm0-240h400v-80H280v80Zm-80 360q-33 0-56.5-23.5T120-240v-480q0-33 23.5-56.5T200-800h560q33 0 56.5 23.5T840-720v480q0 33-23.5 56.5T760-160H200Zm0-80h560v-480H200v480Zm0 0v-480 480Z" />
                      </svg>
                      {getFileSize(backup.size ?? "")}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="14"
                        viewBox="0 -960 960 960"
                        width="14"
                        fill="currentColor"
                      >
                        <path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm-40-160h80v-146l126-76-40-66-166 100v188Zm40-220Z" />
                      </svg>
                      {getDaysAgo(backup.createdTime ?? "")}<span>Days ago</span>
                    </span>
                    <span className="hidden sm:inline">
                      {new Date(backup.createdTime ?? "").toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="w-5 h-5 rounded-full border-2 border-slate-600 flex items-center justify-center transition-colors group-has-checked:border-blue-500 ml-4 shrink-0">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-500 scale-0 group-has-checked:scale-100 transition-transform duration-200"></div>
                </div>
              </div>
            </label>
          ))}
        </div>

        <div className="p-6 border-t border-slate-700/50 bg-slate-900/30 flex justify-between items-center rounded-b-3xl">
          <VaultButton
            className="px-5 py-3 rounded-xl"
            onClick={() => navigate("create")}
            label="Cancel"
          />
          <VaultButton
          variant="primary"
          secondaryIcon={isLoading ? <LoadingIcon/> : <DownloadIcon/>}
          className="px-5 py-3 rounded-xl"
          label="Import Backup"
          disabled={isLoading}
          onClick={handelBackupImport} />
        </div>
      </div>
    </Backdrop>
  );
}
