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
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play reverse play reverse",
        },
      });

      tl.fromTo(".hero-label", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 })
        .fromTo(".hero-title", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.9 }, "-=0.3")
        .fromTo(".hero-stats", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.15 }, "-=0.4")
        .fromTo(".hero-button", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.3")
        .fromTo(".hero-image", { opacity: 0, x: 60 }, { opacity: 1, x: 0, duration: 1 }, "-=1.2");
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="hero"
      className="scroll-mt-20 px-6 md:px-8 lg:px-[15%] pt-15 pb-8 border-b border-brand-100 bg-brand-50/40"
    >
      <div className="grid md:grid-cols-[1fr_320px] lg:grid-cols-[1fr_380px] gap-8 items-center">
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
                Цены ниже среднего. Первая консультация — 40€.
              </p>
            </div>
            <div className="hero-stats">
              <p className="text-xs tracking-widest uppercase text-brand-300 mb-1.5">Из любой точки мира</p>
              <p className="text-base text-stone-500 leading-snug">
                Zoom, Teams, Telegram, WhatsApp. Работаю с клиентами по всему миру.
              </p>
            </div>
            <div className="hero-stats">
              <p className="text-xs tracking-widest uppercase text-brand-300 mb-1.5">Бережно</p>
              <p className="text-base text-stone-500 leading-snug">
                Работаю в темпе, который подходит именно вам. Без спешки и осуждения.
              </p>
            </div>
          </div>
          <div className="hero-button mt-6 flex justify-center md:justify-start">
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
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 320px, 380px"
            className="object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}
