import { ButtonHTMLAttributes, PropsWithChildren } from "react";

type Variant = "primary" | "ghost" | "danger";

export function Button({ children, className = "", ...props }: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) {
  const variant = (props["data-variant"] as Variant | undefined) ?? "primary";
  const styles: Record<Variant, string> = {
    primary: "bg-[var(--color-primary)] text-white",
    ghost: "bg-slate-100 text-[var(--color-text)]",
    danger: "bg-[var(--color-danger)] text-white",
  };

  return (
    <button
      {...props}
      className={`rounded-md px-3 py-2 text-sm font-semibold transition hover:opacity-90 ${styles[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
