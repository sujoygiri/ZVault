import { useContext } from "react";
import { NavigationContext } from "../../context/navigationContext";
import { CloudBackupIcon, XIcon } from "../VaultIcons";
import { Backdrop } from "./Backdrop";


export function CloudBackupActionModal() {
  const {canGoBack, goBack, navigate} = useContext(NavigationContext);
  return (
    <Backdrop>
    <div
      className="relative vault-theme rounded-3xl w-full max-w-sm overflow-hidden z-20 border border-slate-700/50 bg-black"
    >
      <button
        id="close-modal-btn-x"
        className="absolute cursor-pointer top-4 right-4 text-2xl text-slate-500 hover:text-white transition focus:outline-none"
        onClick={() => navigate("startup")}
      >
        <span>
          <XIcon />
        </span>
      </button>

      <div className="p-10 flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-slate-800/80 flex items-center justify-center mb-6 border border-slate-700 shadow-inner">
          <span className="text-3xl text-blue-400">
            <CloudBackupIcon />
          </span>
        </div>

        <h2 className="text-2xl font-bold text-white text-center mb-3 tracking-tight">
          Cloud Backup Found
        </h2>

        <p className="text-sm text-slate-400 text-center max-w-xs leading-relaxed font-normal">
          We found backup files linked to your Google account. Would you like to
          restore from a backup?
        </p>
      </div>

      <div className="px-8 py-6 flex justify-center gap-4 border-t border-slate-800/60 bg-black/20">
        <button
          id="close-modal-btn-skip"
          className="px-8 py-2.5 cursor-pointer bg-transparent text-slate-300 border border-slate-700 rounded-xl hover:bg-slate-800 hover:text-white transition text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-slate-500"
          onClick={() => navigate("create")}
        >
          No, skip
        </button>
        <button className="px-8 py-2.5 cursor-pointer bg-blue-600 text-white rounded-xl hover:bg-blue-500 transition text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-[0_0_15px_rgba(37,99,235,0.2)]" onClick={() => navigate("backup_list")}>
          Yes, show backups
        </button>
      </div>
    </div>
    </Backdrop>
  );
}
