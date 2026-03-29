"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

type ModalProps = {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
};

export function Modal({ isOpen, title, onClose, children }: ModalProps) {
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpen || !panelRef.current) {
      return;
    }

    gsap.fromTo(
      panelRef.current,
      { autoAlpha: 0, y: 18, scale: 0.98 },
      { autoAlpha: 1, y: 0, scale: 1, duration: 0.28, ease: "power2.out" },
    );
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4 backdrop-blur-sm" onClick={onClose}>
      <div
        ref={panelRef}
        className="w-full max-w-lg rounded-3xl border border-white/50 bg-white p-6 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
          <button
            aria-label="Close modal"
            className="rounded-xl p-2 text-slate-500 transition-colors hover:bg-slate-100"
            onClick={onClose}
            type="button"
          >
            X
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}