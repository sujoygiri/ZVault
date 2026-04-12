import React, { useState, useRef, useEffect, useContext } from "react";
import VaultButton from "./VaultButton";
import { LoadingIcon, LockIcon, RightPointingArrowIcon } from "./VaultIcons";
import { NavigationContext } from "../context/navigationContext";

// ─── Eye toggle icon ──────────────────────────────────────────────────────────

function EyeIcon({ open }: { open: boolean }) {
  return open ? (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

// ─── Password input ───────────────────────────────────────────────────────────

interface PasswordInputProps {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  label: string;
  error?: string;
  autoFocus?: boolean;
}

function PasswordInput({
  value,
  onChange,
  placeholder = "Enter password",
  label,
  error,
  autoFocus = false,
}: PasswordInputProps) {
  const [visible, setVisible] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus();
  }, [autoFocus]);

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-[12px] font-medium text-[#94a3b8] tracking-wide uppercase">
        {label}
      </label>

      <div
        className={[
          "relative flex items-center",
          "h-13 rounded-xl",
          "bg-[#0d1117] border",
          "transition-all duration-200",
          error
            ? "border-[#f87171] ring-1 ring-[#f87171]/30"
            : "border-white/8 focus-within:border-[#6366f1]/60 focus-within:ring-1 focus-within:ring-[#6366f1]/20",
        ].join(" ")}
      >
        <input
          ref={inputRef}
          type={visible ? "text" : "password"}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          className={[
            "flex-1 h-full bg-transparent",
            "px-4 text-[14px] text-[#e2e8f0]",
            "placeholder:text-[#475569]",
            "outline-none border-none",
            "font-mono tracking-widest",
          ].join(" ")}
        />

        {/* Show/hide toggle */}
        <button
          type="button"
          onClick={() => setVisible(v => !v)}
          className="flex items-center justify-center w-10 h-full text-[#475569] hover:text-[#94a3b8] transition-colors shrink-0"
          tabIndex={-1}
        >
          <EyeIcon open={visible} />
        </button>
      </div>

      {/* Inline error */}
      {error && (
        <p className="text-[12px] text-[#f87171] flex items-center gap-1.5">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}

// ─── UnlockVault ──────────────────────────────────────────────────────────────

// interface UnlockVaultProps {
//   onUnlock: (password: string) => Promise<void> | void;
//   onBack?: () => void;
//   isLoading?: boolean;
//   error?: string;
// }

export function VaultUnlockScreen() {
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { canGoBack, goBack, navigate, replaceScreen, setNavigationData } = useContext(NavigationContext)

  const handleSubmit = async () => {
    if (!password.trim()) {
      setLocalError("Master password is required");
      return;
    }
    setLocalError("");
    // await onUnlock(password);
    setIsLoading(true);
    const unlockResponse = await window.electronAPI.unlockVault(password.trim());
    if (unlockResponse) {
      setNavigationData(unlockResponse);
      setIsLoading(false);
      replaceScreen("vault");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSubmit();
  };

  const displayError = localError;

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen w-full px-6 bg-[#0d1b2e] overflow-hidden">

      {/* Aurora */}
      <div
        className="pointer-events-none absolute top-0 inset-x-0 h-60"
        style={{ background: "linear-gradient(180deg, rgba(99,102,241,0.13) 0%, rgba(6,182,212,0.05) 40%, transparent 100%)" }}
      />
      <div className="pointer-events-none absolute bottom-0 inset-x-0 h-35 bg-linear-to-t from-[#020617]/60 to-transparent" />

      {/* Card */}
      <div
        className={[
          "relative z-10 flex flex-col items-center w-full max-w-120",
          "bg-white/3 border border-white/[0.07]",
          "rounded-2xl px-8 py-10",
          "shadow-[0_24px_64px_rgba(0,0,0,0.4)]",
          "backdrop-blur-sm",
        ].join(" ")}
      >
        {/* Icon */}
        <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-linear-to-br from-[#7c7ff5] to-[#5254cc] shadow-[0_6px_24px_rgba(99,102,241,0.4)] ring-1 ring-white/20 mb-6">
          <LockIcon size={26} />
        </div>

        {/* Heading */}
        <h2 className="text-[22px] font-bold text-[#e2e8f0] tracking-[-0.02em] mb-1 text-center">
          Welcome back
        </h2>
        <p className="text-[13px] text-[#64748b] mb-7 text-center">
          Enter your master password to unlock
        </p>

        {/* Input */}
        <div className="w-full mb-5" onKeyDown={handleKeyDown}>
          <PasswordInput
            label="Master password"
            value={password}
            onChange={setPassword}
            placeholder="••••••••••••"
            error={displayError}
            autoFocus
          />
        </div>

        {/* Submit */}
        <VaultButton
          variant="primary"
          className="w-full px-6 py-4"
          primaryIcon={<RightPointingArrowIcon />}
          secondaryIcon={isLoading ? <LoadingIcon /> : ""}
          label={isLoading ? "Unlocking…" : "Unlock vault"}
          onClick={handleSubmit}
          disabled={isLoading || !password}
        />

        {/* Back link */}
        {canGoBack && (
          <VaultButton
            label="← Back to start"
            onClick={goBack}
            className="mt-4 text-[13px] text-[#475569] hover:text-[#d9dee6] transition-colors"
          />
        )}
      </div>
    </div>
  );
}