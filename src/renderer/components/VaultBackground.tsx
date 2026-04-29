import { ChildrenProps } from "../../shared/api.types";

export default function Background({ children }: ChildrenProps) {
  return (
    <>
      <div
        className={[
          "fixed inset-0 overflow-hidden z-0",
          "transition-colors duration-400",
          "bg-[linear-gradient(to_bottom_right,var(--z-vault-bg-gradient))]",
        ].join(" ")}
      ></div>
      <div className="relative flex z-10 h-full w-full text-white">{children}</div>
    </>
  );
}
