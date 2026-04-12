import React from "react";

// ─── Shared prop type ─────────────────────────────────────────────────────────

interface IconProps {
  size?: number;
  className?: string;
}

// ─── Google ───────────────────────────────────────────────────────────────────

export function GoogleIcon({ size = 18, className = "" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57C21.36 18.1 22.56 15.28 22.56 12.25z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

// ─── Save / Local backup ──────────────────────────────────────────────────────

export function SaveIcon({ size = 18, className = "" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer floppy body */}
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="3"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      {/* Top label slot */}
      <rect
        x="7"
        y="3"
        width="10"
        height="6"
        rx="1"
        fill="currentColor"
        opacity="0.25"
      />
      {/* Write notch on label */}
      <rect
        x="14"
        y="4"
        width="1.5"
        height="4"
        rx="0.5"
        fill="currentColor"
        opacity="0.7"
      />
      {/* Bottom data tray */}
      <rect
        x="6"
        y="13"
        width="12"
        height="7"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      {/* Tray inner lines */}
      <line
        x1="9"
        y1="16"
        x2="15"
        y2="16"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.5"
      />
      <line
        x1="9"
        y1="18.5"
        x2="13"
        y2="18.5"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  );
}

// ─── Sparkle / New vault ──────────────────────────────────────────────────────

export function SparkleIcon({ size = 18, className = "" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Large centre star */}
      <path
        d="M12 2 L13.5 9.5 L21 12 L13.5 14.5 L12 22 L10.5 14.5 L3 12 L10.5 9.5 Z"
        fill="currentColor"
        opacity="0.95"
      />
      {/* Small top-right sparkle */}
      <path
        d="M19 2 L19.7 4.3 L22 5 L19.7 5.7 L19 8 L18.3 5.7 L16 5 L18.3 4.3 Z"
        fill="currentColor"
        opacity="0.7"
      />
      {/* Tiny bottom-left sparkle */}
      <path
        d="M5 17 L5.5 18.5 L7 19 L5.5 19.5 L5 21 L4.5 19.5 L3 19 L4.5 18.5 Z"
        fill="currentColor"
        opacity="0.55"
      />
    </svg>
  );
}

// ─── Lock (AppIcon inner glyph) ───────────────────────────────────────────────

export function LockIcon({ size = 32, className = "" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Shackle */}
      <rect
        x="9"
        y="14"
        width="14"
        height="12"
        rx="3"
        fill="white"
        opacity="0.95"
      />
      {/* Shackle arc */}
      <path
        d="M11 14V11a5 5 0 0 1 10 0v3"
        stroke="white"
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="none"
        opacity="0.95"
      />
      {/* Keyhole outer circle */}
      <circle cx="16" cy="20" r="2.2" fill="#6366f1" opacity="0.9" />
      {/* Keyhole stem */}
      <rect
        x="15.1"
        y="21"
        width="1.8"
        height="2.5"
        rx="0.6"
        fill="#6366f1"
        opacity="0.9"
      />
    </svg>
  );
}

// ─── Sidebar toggle (expand/collapse) ─────────────────────────────────────────

interface SidebarToggleIconProps extends IconProps {
  open?: boolean;
}

export function SidebarToggleIcon({
  size = 18,
  className = "",
  open = false,
}: SidebarToggleIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ transition: "transform 0.3s ease" }}
    >
      {/* Sidebar background */}
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      {/* Left panel */}
      <rect
        x="3"
        y="3"
        width={open ? "6" : "4"}
        height="18"
        rx="2"
        fill="currentColor"
        opacity="0.3"
      />
      {/* Content lines */}
      <line
        x1="10"
        y1="7"
        x2={open ? "20" : "18"}
        y2="7"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.6"
      />
      <line
        x1="10"
        y1="12"
        x2={open ? "20" : "18"}
        y2="12"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.6"
      />
      <line
        x1="10"
        y1="17"
        x2={open ? "20" : "18"}
        y2="17"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.6"
      />
      {/* Arrow chevron */}
      <path
        d={open ? "M16 9 L14 12 L16 15" : "M8 9 L10 12 L8 15"}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.8"
      />
    </svg>
  );
}

// ─── Dashboard / Grid ────────────────────────────────────────────────────────

export function DashboardIcon({ size = 18, className = "" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Top-left grid cell */}
      <rect
        x="3"
        y="3"
        width="8"
        height="8"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      {/* Top-right grid cell */}
      <rect
        x="13"
        y="3"
        width="8"
        height="8"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      {/* Bottom-left grid cell */}
      <rect
        x="3"
        y="13"
        width="8"
        height="8"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      {/* Bottom-right grid cell */}
      <rect
        x="13"
        y="13"
        width="8"
        height="8"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

// Password Icon
export function PasswordIcon({ size = 24, className = "" }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={size}
      viewBox="0 -960 960 960"
      width={size}
      fill="currentcolor"
      className={className}
    >
      <path d="M80-200v-80h800v80H80Zm46-242-52-30 34-60H40v-60h68l-34-58 52-30 34 58 34-58 52 30-34 58h68v60h-68l34 60-52 30-34-60-34 60Zm320 0-52-30 34-60h-68v-60h68l-34-58 52-30 34 58 34-58 52 30-34 58h68v60h-68l34 60-52 30-34-60-34 60Zm320 0-52-30 34-60h-68v-60h68l-34-58 52-30 34 58 34-58 52 30-34 58h68v60h-68l34 60-52 30-34-60-34 60Z" />
    </svg>
  );
}

// Texts Icon
export function TextIcon({ size = 24, className = "" }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={size} viewBox="0 -960 960 960" width={size} fill="currentcolor"><path d="M280-280h280v-80H280v80Zm0-160h400v-80H280v80Zm0-160h400v-80H280v80Zm-80 480q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z" /></svg>
  );
}

// Settings Icon
export function SettingIcon({ size = 24, className = "" }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={size} viewBox="0 -960 960 960" width={size} fill="currentcolor"><path d="m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm70-80h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Zm42-180q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Zm-2-140Z" /></svg>
  );
}

// x icon
export function XIcon({ size = 24, className = "" }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={size} viewBox="0 -960 960 960" width={size} fill="currentcolor"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg>
  );
}

// cloud backup icon
export function CloudBackupIcon({ size = 24, className = "" }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={size} viewBox="0 -960 960 960" width={size} fill="currentcolor"><path d="M260-160q-91 0-155.5-63T40-377q0-78 47-139t123-78q17-72 85-137t145-65q33 0 56.5 23.5T520-716v242l64-62 56 56-160 160-160-160 56-56 64 62v-242q-76 14-118 73.5T280-520h-20q-58 0-99 41t-41 99q0 58 41 99t99 41h480q42 0 71-29t29-71q0-42-29-71t-71-29h-60v-80q0-48-22-89.5T600-680v-93q74 35 117 103.5T760-520q69 8 114.5 59.5T920-340q0 75-52.5 127.5T740-160H260Zm220-358Z" /></svg>
  );
}

// Loading spinner icon
export function LoadingIcon({ size = 24, className = "" }: IconProps) {
  return (
    <svg className="animate-spin" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
    </svg>
  );
}

// Right pointing arrow
export function RightPointingArrowIcon({ size = 24, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <path d="M19 11H5M12 4l7 7-7 7" />
    </svg>
  )
}

// Download Icon
export function DownloadIcon({ size = 24, className = "" }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={size}
      viewBox="0 -960 960 960"
      width={size}
      fill="currentColor"
    >
      <path d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z" />
    </svg>
  );
}

// ─── AppIcon wrapper (badge with gradient + glow) ─────────────────────────────

export function AppIcon() {
  return (
    <div
      className={[
        "relative flex items-center justify-center",
        "w-18 h-18 rounded-[20px]",
        "bg-linear-to-br from-[#7c7ff5] to-[#5254cc]",
        "shadow-[0_8px_32px_rgba(99,102,241,0.45)]",
        "ring-1 ring-white/20",
      ].join(" ")}
    >
      <div className="absolute inset-0 rounded-[20px] bg-[#6366f1]/30 blur-xl -z-10 scale-125" />
      <LockIcon size={32} />
    </div>
  );
}
