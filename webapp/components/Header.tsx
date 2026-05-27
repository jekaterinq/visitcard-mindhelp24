"use client";

import { useState } from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";

const navLinks = [
  { href: "#about", label: "Обо мне" },
  { href: "#services", label: "Услуги" },
  { href: "#reviews", label: "Отзывы" },
  { href: "#footer", label: "Контакты" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-brand-100 bg-[#f8fbfd]/90 backdrop-blur-sm">
      <div className="pl-4 pr-4 md:px-8 lg:px-[15%] py-4 flex items-center justify-between">
        <a href="#hero" onClick={close}>
          <Image src="/images/logo-no-back.png" alt="MindHelp24" width={190} height={30} className="h-16 w-auto" loading="eager" priority />
        </a>

        <nav className="hidden md:flex items-center gap-8 text-base text-stone-400">
          {navLinks.map(({ href, label }) => (
            <a key={href} href={href} className="hover:text-stone-700 transition-colors">
              {label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button variant="outline" href="#bookingform" className="px-5 py-2">
            Записаться
          </Button>
        </div>

        <button
          className="md:hidden flex flex-col gap-1.5 p-2 -mr-2"
          onClick={() => setIsOpen((o) => !o)}
          aria-label={isOpen ? "Закрыть меню" : "Открыть меню"}
        >
          <span className={`block w-6 h-0.5 bg-brand-300 transition-all duration-300 origin-center ${isOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-brand-300 transition-all duration-300 ${isOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-brand-300 transition-all duration-300 origin-center ${isOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {isOpen && (
        <nav className="md:hidden border-t border-brand-100 bg-[#f8fbfd] px-6 py-5 flex flex-col gap-1">
          {navLinks.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              onClick={close}
              className="text-base text-stone-400 hover:text-stone-700 transition-colors py-2"
            >
              {label}
            </a>
          ))}
          <div className="pt-3 mt-2 border-t border-brand-100">
            <Button variant="outline" href="#bookingform" onClick={close} className="w-full text-center">
              Записаться
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
}
