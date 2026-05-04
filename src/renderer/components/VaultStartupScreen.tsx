import React, { useEffect, useState, useContext } from "react";
import VaultButton, { VaultButtonVariant } from "./VaultButton";
import { CloudBackupActionModal } from "./modal/CloudBackupAction";
import { AppIcon, GoogleIcon, LoadingIcon } from "./VaultIcons";
import { ModalName } from "../../shared/api.types";
import { NavigationContext } from "../context/navigationContext";
import { NavigateFn } from "../context/provider/NavigationProvider";
import { CloudBackupListModal } from "./modal/CloudBackupList";
import { Backdrop } from "./modal/Backdrop";

// ─── Stagger animation hook ───────────────────────────────────────────────────
// Each child gets a `visible` class after a staggered delay on mount.

function useStagger(count: number, delayMs = 80) {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      setVisibleCount(current);
      if (current >= count) clearInterval(interval);
    }, delayMs);
    return () => clearInterval(interval);
  }, [count, delayMs]);

  return (index: number) => index < visibleCount;
}

// ─── Stagger wrapper ──────────────────────────────────────────────────────────

interface FadeUpProps {
  visible: boolean;
  delay?: number;
  children: React.ReactNode;
  className?: string;
}

function FadeUp({ visible, children, className = "" }: FadeUpProps) {
  return (
    <div
      className={[
        "transition-all duration-500 ease-out",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

// interface StartupScreenProps {
//   onGoogleSignIn?: () => void;
//   onLocalBackup?: () => void;
//   onNewVault?: () => void;
// }

export function VaultStartupScreen() {
  const { canGoBack, goBack, navigate, replaceScreen, setNavigationData } =
    useContext(NavigationContext);
  const [isLoading, setIsLoading] = useState<{ type: VaultButtonVariant, state: boolean }>({ type: "ghost", state: false });
  useEffect(() => {
    const checkVaultStatus = async () => {
      const existStatusResponse = await window.electronAPI.vaultExistStatus();
      console.log(existStatusResponse);
      if (existStatusResponse) {
        // replaceScreen("unlock");
        // need to remove following line
        const unlockResponse = await window.electronAPI.unlockVault("Password@1234");
        setNavigationData(unlockResponse);
        // ============ +++++++++++ ============ //
        replaceScreen("vault");
      } else {
        navigate("startup");
      }
    };
    checkVaultStatus();
  }, []);
  const isVisible = useStagger(7, 90);

  const handelGoogleBackup = async () => {
    setIsLoading({ type: "ghost", state: true });
    const existingBackupResponse =
      await window.electronAPI.checkExistingBackup();
    setIsLoading({ type: "ghost", state: false });
    if (existingBackupResponse.isBackupPresent) {
      navigate("backup_action");
      setNavigationData(existingBackupResponse.data)
    } else {
    }
  };

  const handelLocalBackup = async () => {
    setIsLoading({ type: "outline", state: true });
    const localBackupResponse = await window.electronAPI.openLocalBackup();
    setIsLoading({ type: "outline", state: true });
    if (localBackupResponse.success) {
      navigate("unlock");
    }
  };

  const handleNewVaultCreation = () => {
    navigate("create");
  };

  return (
    <>
      <div
        className={[
          "relative flex flex-col items-center justify-center",
          "min-h-screen w-full px-6",
          // "bg-[#0d1b2e]",
          "overflow-hidden",
        ].join(" ")}
      >
        {/* Subtle top aurora */}
        <div
          className="pointer-events-none absolute top-0 inset-x-0 h-60"
          style={{
            background:
              "linear-gradient(180deg, rgba(99,102,241,0.13) 0%, rgba(6,182,212,0.05) 40%, transparent 100%)",
          }}
        />
        {/* Faint bottom depth */}
        <div className="pointer-events-none absolute bottom-0 inset-x-0 h-35 bg-linear-to-t from-[#020617]/60 to-transparent" />

        {/* ── Card ──────────────────────────────────────────────── */}
        <div className="relative z-10 flex flex-col items-center w-full max-w-90 gap-0">
          {/* App icon */}
          <FadeUp visible={isVisible(0)} className="mb-7">
            <AppIcon />
          </FadeUp>

          {/* Title */}
          <FadeUp visible={isVisible(1)} className="mb-1">
            <h1 className="text-[32px] font-bold text-[#e2e8f0] tracking-[-0.02em] text-center">
              Z Vault
            </h1>
          </FadeUp>

          {/* Subtitles */}
          <FadeUp
            visible={isVisible(2)}
            className="mb-8 flex flex-col items-center gap-0.5"
          >
            <p className="text-[14px] text-[#6366f1] font-medium tracking-wide text-center">
              Your secure password manager
            </p>
            <p className="text-[13px] text-[#64748b] text-center">
              Choose how you'd like to get started
            </p>
          </FadeUp>

          {/* Buttons */}
          <div className="w-full flex flex-col gap-3">
            <FadeUp visible={isVisible(3)}>
              <VaultButton
                variant="ghost"
                className="w-full px-6 py-4"
                primaryIcon={<GoogleIcon />}
                label="Sign in to use cloud backup file"
                onClick={() => handelGoogleBackup()}
                secondaryIcon={isLoading.type === "ghost" && isLoading.state && <LoadingIcon />}
                disabled={isLoading.state}
              />
            </FadeUp>

            <FadeUp visible={isVisible(4)}>
              <VaultButton
                variant="outline"
                className="w-full px-6 py-4"
                primaryIcon={<span className="text-base leading-none">💾</span>}
                label="I have local backup file"
                onClick={() => handelLocalBackup()}
                secondaryIcon={isLoading.type === "outline" && isLoading.state && <LoadingIcon />}
                disabled={isLoading.state}
              />
            </FadeUp>

            <FadeUp visible={isVisible(5)}>
              <VaultButton
                variant="primary"
                className="w-full px-6 py-4"
                primaryIcon={<span className="text-base leading-none">✨</span>}
                label="Open new vault"
                onClick={handleNewVaultCreation}
                secondaryIcon={isLoading.type === "primary" && isLoading.state && <LoadingIcon />}
                disabled={isLoading.state}
              />
            </FadeUp>
          </div>

          {/* Footer legal */}
          <FadeUp visible={isVisible(6)} className="mt-8">
            <p className="text-[12px] text-[#475569] text-center leading-relaxed">
              By continuing, you agree to our{" "}
              <button className="text-[#6366f1] hover:text-[#818cf8] transition-colors underline underline-offset-2 cursor-pointer bg-transparent border-none p-0">
                Terms of Service
              </button>{" "}
              and{" "}
              <button className="text-[#6366f1] hover:text-[#818cf8] transition-colors underline underline-offset-2 cursor-pointer bg-transparent border-none p-0">
                Privacy Policy
              </button>
            </p>
          </FadeUp>
        </div>
      </div>
    </>
  );
}
