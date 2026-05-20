"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Button from "@/components/ui/Button";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",   // запускается когда верх секции входит в 80% экрана
          end: "bottom 20%",  // заканчивается когда низ секции уходит за 20% экрана
          toggleActions: "play reverse play reverse",
          // ↑ что делать при: enter / leave / re-enter / re-leave
        },
      });

      tl.from(".hero-label", { opacity: 0, y: 20, duration: 0.6 })
        .from(".hero-title", { opacity: 0, y: 50, duration: 0.9 }, "-=0.3")
        .from(".hero-stats", { opacity: 0, y: 30, duration: 0.7, stagger: 0.15 }, "-=0.4")
        .from(".hero-button", { opacity: 0, y: 20, duration: 0.5 }, "-=0.3")
        .from(".hero-image", { opacity: 0, x: 60, duration: 1 }, "-=1.2");
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="hero"
      className="scroll-mt-20 px-6 md:px-[15%] pt-10 pb-8 border-b border-brand-100 bg-brand-50/40"
    >
      <div className="grid md:grid-cols-[1fr_320px] lg:grid-cols-[1fr_380px] gap-8 items-start">
        <div>
          <p className="hero-label text-sm tracking-widest uppercase text-brand-300 mb-3">
            ЮЛИЯ МИРОНОВА — ПСИХОЛОГ
          </p>
          <h1 className="hero-title text-4xl md:text-6xl lg:text-7xl font-light leading-tight tracking-tight max-w-4xl text-stone-800">
            Любую психотравму можно проработать.
          </h1>
          <div className="mt-8 border-t border-brand-100 pt-6 grid sm:grid-cols-3 gap-5 items-start">
            <div className="hero-stats">
              <p className="text-xs tracking-widest uppercase text-brand-300 mb-1.5">Доступно</p>
              <p className="text-base text-stone-500 leading-snug">
                Цены ниже среднего. Первая консультация — 35€, пакеты со скидкой.
              </p>
            </div>
            <div className="hero-stats">
              <p className="text-xs tracking-widest uppercase text-brand-300 mb-1.5">Из любой точки мира</p>
              <p className="text-base text-stone-500 leading-snug">
                Zoom, Teams, Telegram, WhatsApp. Работаю с клиентами по всему миру.
              </p>
            </div>
            <div className="hero-stats">
              <p className="text-xs tracking-widest uppercase text-brand-300 mb-1.5">Бесплатно</p>
              <p className="text-base text-stone-500 leading-snug">
                Раз в месяц — бесплатная консультация для тех, кто не может позволить платную.
              </p>
            </div>
          </div>
          <div className="hero-button mt-6 flex flex-col items-center md:flex-row md:items-center gap-3">
            <Button variant="primary" href="#bookingform" className="md:px-12 md:py-4 md:text-xl">
              Записаться на сессию
            </Button>
          </div>
        </div>

        <div className="hero-image relative w-full aspect-3/4 rounded-2xl overflow-hidden">
          <Image
            src="/images/photo-1.jpg"
            alt="Юлия Миронова — психолог"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}
