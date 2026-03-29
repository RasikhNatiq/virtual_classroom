"use client";

import { useRef } from "react";
import gsap from "gsap";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  isLoading?: boolean;
};

const variantClassMap: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "bg-gradient-to-r from-sky-600 to-cyan-500 text-white shadow-lg shadow-cyan-600/20 hover:from-sky-500 hover:to-cyan-400",
  secondary: "bg-white text-slate-800 border border-slate-200 hover:bg-slate-50",
  ghost: "bg-transparent text-slate-600 hover:bg-slate-100",
  danger: "bg-rose-600 text-white shadow-lg shadow-rose-600/20 hover:bg-rose-500",
};

export function Button({
  children,
  className = "",
  variant = "primary",
  isLoading = false,
  disabled,
  ...props
}: ButtonProps) {
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const handleMouseEnter = () => {
    if (!buttonRef.current || disabled || isLoading) {
      return;
    }
    gsap.to(buttonRef.current, { y: -1, scale: 1.01, duration: 0.2, ease: "power2.out" });
  };

  const handleMouseLeave = () => {
    if (!buttonRef.current || disabled || isLoading) {
      return;
    }
    gsap.to(buttonRef.current, { y: 0, scale: 1, duration: 0.2, ease: "power2.out" });
  };

  return (
    <button
      ref={buttonRef}
      className={`inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 disabled:cursor-not-allowed disabled:opacity-60 ${variantClassMap[variant]} ${className}`}
      disabled={disabled || isLoading}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {isLoading ? (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent" />
      ) : null}
      {children}
    </button>
  );
}