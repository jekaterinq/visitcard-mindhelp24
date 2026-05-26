"use client";

import Image from "next/image";
import Button from "@/components/ui/Button";

export default function Header() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 px-6 md:px-[15%] py-4 border-b border-brand-100 bg-[#f8fbfd]/90 backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <a href="#hero" >
          <Image src="/images/logo-no-back.png" alt="MindHelp24" width={190} height={30} className="h-16 w-auto" />
        </a>
        <nav className="hidden md:flex items-center gap-8 text-base text-stone-400">
          <a href="#about" className="hover:text-stone-700 transition-colors">Обо мне</a>
          <a href="#services" className="hover:text-stone-700 transition-colors">Услуги</a>
          <a href="#reviews" className="hover:text-stone-700 transition-colors">Отзывы</a>
          <a href="#footer" className="hover:text-stone-700 transition-colors">Контакты</a>
        </nav>
        <Button variant="outline" href="#bookingform" className="px-5 py-2">
          Записаться
        </Button>
      </div>
    </header>
  );
}
