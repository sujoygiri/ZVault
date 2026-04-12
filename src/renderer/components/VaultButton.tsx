import React from "react";

export type VaultButtonVariant = "ghost" | "outline" | "primary";

interface VaultButtonProps {
  label: string;
  variant?: VaultButtonVariant;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  primaryIcon?: React.ReactNode;
  secondaryIcon?: React.ReactNode;
}

const variantClasses: Record<VaultButtonVariant, string> = {
  ghost: [
    "bg-[#0d1117] border border-white/[0.08]",
    "text-[#e2e8f0]",
    "hover:bg-[#161b27] hover:border-white/[0.14]",
    "active:scale-[0.98]",
  ].join(" "),
  outline: [
    "bg-transparent border-2 border-[#4f52c4]",
    "text-[#e2e8f0]",
    "hover:bg-[#6366f1]/10 hover:border-[#6366f1]",
    "active:scale-[0.98]",
  ].join(" "),
  primary: [
    "bg-[#6366f1]",
    "text-white",
    "hover:bg-[#4f52c4] hover:shadow-[0_0_24px_rgba(99,102,241,0.4)]",
    "active:scale-[0.98]",
  ].join(" "),
};

export default function VaultButton({
  primaryIcon,
  label,
  variant,
  onClick,
  disabled = false,
  className,
  secondaryIcon,
}: VaultButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={[
        "flex items-center justify-center gap-3 rounded-2xl",
        "text-[15px] font-semibold tracking-[-0.01em]",
        "transition-all duration-200 ease-out",
        "cursor-pointer select-none",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6366f1]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d1b2e]",
        "disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100",
        className,
        variant && variantClasses[variant],
      ].join(" ")}
    >
      {primaryIcon && (<span className="flex items-center justify-center w-5 h-5 shrink-0">
        {primaryIcon}
      </span>
      )}
      <span>{label}</span>
      {secondaryIcon && (
        <span className="flex items-center justify-center w-5 h-5 shrink-0">
          {secondaryIcon}
        </span>
      )}
    </button>
  );
}
