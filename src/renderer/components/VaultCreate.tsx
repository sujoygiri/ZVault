import React, { useState, useRef, useEffect, useContext } from "react";
import VaultButton from "./VaultButton";
import { LockIcon } from "./VaultIcons";
import { NavigationContext } from "../context/navigationContext";

// ─── Eye toggle ───────────────────────────────────────────────────────────────

function EyeIcon({ open }: { open: boolean }) {
  return open ? (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  ) : (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
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
  hint?: string;
  autoFocus?: boolean;
  onKeyDown?: (e: React.KeyboardEvent) => void;
}

function PasswordInput({
  value,
  onChange,
  placeholder = "Enter password",
  label,
  error,
  hint,
  autoFocus = false,
  onKeyDown,
}: PasswordInputProps) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => { if (autoFocus) ref.current?.focus(); }, [autoFocus]);

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-[12px] font-medium text-[#94a3b8] tracking-wide uppercase">
        {label}
      </label>
      <div
        className={[
          "relative flex items-center h-13 rounded-xl bg-[#0d1117] border transition-all duration-200",
          error
            ? "border-[#f87171] ring-1 ring-[#f87171]/30"
            : "border-white/8 focus-within:border-[#6366f1]/60 focus-within:ring-1 focus-within:ring-[#6366f1]/20",
        ].join(" ")}
      >
        <input
          ref={ref}
          type={visible ? "text" : "password"}
          value={value}
          onChange={e => onChange(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          className="flex-1 h-full bg-transparent px-4 text-[14px] text-[#e2e8f0] placeholder:text-[#475569] outline-none border-none font-mono tracking-widest"
        />
        <button
          type="button"
          onClick={() => setVisible(v => !v)}
          className="flex items-center justify-center w-10 h-full text-[#475569] hover:text-[#94a3b8] transition-colors shrink-0"
          tabIndex={-1}
        >
          <EyeIcon open={visible} />
        </button>
      </div>
      {error && (
        <p className="text-[12px] text-[#f87171] flex items-center gap-1.5">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
          </svg>
          {error}
        </p>
      )}
      {hint && !error && (
        <p className="text-[12px] text-[#475569]">{hint}</p>
      )}
    </div>
  );
}

// ─── Strength meter ───────────────────────────────────────────────────────────

interface StrengthResult {
  score: number;        // 0–4
  label: string;
  color: string;        // Tailwind bg class
}

function getStrength(password: string): StrengthResult {
  if (!password) return { score: 0, label: "", color: "bg-white/10" };

  let score = 0;
  if (password.length >= 8)  score++;
  if (password.length >= 14) score++;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
  if (/\d/.test(password))   score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  // Clamp to 4
  const s = Math.min(score, 4);
  const levels: StrengthResult[] = [
    { score: 0, label: "",         color: "bg-white/10"  },
    { score: 1, label: "Weak",     color: "bg-[#f87171]" },
    { score: 2, label: "Fair",     color: "bg-[#fb923c]" },
    { score: 3, label: "Good",     color: "bg-[#facc15]" },
    { score: 4, label: "Strong",   color: "bg-[#34d399]" },
  ];
  return levels[s];
}

function StrengthMeter({ password }: { password: string }) {
  const { score, label, color } = getStrength(password);
  if (!password) return null;

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <div className="flex gap-1">
        {[1, 2, 3, 4].map(i => (
          <div
            key={i}
            className={[
              "h-1 flex-1 rounded-full transition-all duration-300",
              i <= score ? color : "bg-white/10",
            ].join(" ")}
          />
        ))}
      </div>
      {label && (
        <p className={[
          "text-[11px] font-medium transition-colors",
          score === 1 ? "text-[#f87171]"
            : score === 2 ? "text-[#fb923c]"
            : score === 3 ? "text-[#facc15]"
            : "text-[#34d399]",
        ].join(" ")}>
          {label} password
        </p>
      )}
    </div>
  );
}

// ─── CreateVault ──────────────────────────────────────────────────────────────

// interface CreateVaultProps {
//   onCreate: (password: string) => Promise<void> | void;
//   onBack?: () => void;
//   isLoading?: boolean;
//   error?: string;
// }

export default function VaultCreate() {
  const [password, setPassword]   = useState("");
  const [confirm, setConfirm]     = useState("");
  const [errors, setErrors]       = useState({ password: "", confirm: "" });
  const [isLoading, setIsLoading] = useState(false);

  const {canGoBack, goBack, navigate, replaceScreen} = useContext(NavigationContext);

  const validate = (): boolean => {
    const next = { password: "", confirm: "" };
    if (!password)
      next.password = "Master password is required";
    else if (password.length < 8)
      next.password = "Password must be at least 8 characters";
    else if (getStrength(password).score < 2)
      next.password = "Password is too weak";

    if (!confirm)
      next.confirm = "Please confirm your password";
    else if (password !== confirm)
      next.confirm = "Passwords do not match";

    setErrors(next);
    return !next.password && !next.confirm;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    // await onCreate(password);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSubmit();
  };

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
          Create your vault
        </h2>
        <p className="text-[13px] text-[#64748b] mb-7 text-center">
          Set a strong master password — this encrypts everything
        </p>

        {/* Server error */}
        {errors && (
          <div className="w-full mb-4 px-3 py-2.5 rounded-xl bg-[#f87171]/10 border border-[#f87171]/20 text-[13px] text-[#f87171]">
            {errors.password}
          </div>
        )}

        {/* Inputs */}
        <div className="w-full flex flex-col gap-4 mb-5" onKeyDown={handleKeyDown}>
          <div className="flex flex-col gap-2">
            <PasswordInput
              label="Master password"
              value={password}
              onChange={v => { setPassword(v); setErrors(e => ({ ...e, password: "" })); }}
              placeholder="••••••••••••"
              error={errors.password}
              hint="At least 8 characters with mixed case, numbers and symbols"
              autoFocus
            />
            <StrengthMeter password={password} />
          </div>

          <PasswordInput
            label="Confirm password"
            value={confirm}
            onChange={v => { setConfirm(v); setErrors(e => ({ ...e, confirm: "" })); }}
            placeholder="••••••••••••"
            error={errors.confirm}
          />
        </div>

        {/* Submit */}
        <VaultButton
          variant="primary"
          icon={
            isLoading ? (
              <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="currentColor" opacity="0.15"/>
                <path d="M9 12l2 2 4-4"/>
              </svg>
            )
          }
          label={isLoading ? "Creating vault…" : "Create vault"}
          onClick={handleSubmit}
          disabled={isLoading || !password || !confirm}
        />

        {/* Back link */}
        {canGoBack && (
          <button
            onClick={goBack}
            className="mt-4 text-[13px] text-[#475569] hover:text-[#94a3b8] transition-colors"
          >
            ← Back to start
          </button>
        )}
      </div>
    </div>
  );
}