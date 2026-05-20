"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const certificates = [
  { src: "/images/sertificate-test.png", alt: "Сертификат 1" },
  { src: "/images/sertificate-test.png", alt: "Сертификат 2" },
  { src: "/images/sertificate-test.png", alt: "Сертификат 3" },
];

const AUTOPLAY_DELAY = 3500;

export default function Experience() {
  const [current, setCurrent] = useState(0);
  const containerRef = useRef<HTMLElement>(null);
  const slideRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const directionRef = useRef<1 | -1>(1);

  const next = useCallback(() => { directionRef.current = 1;  setCurrent((i) => (i + 1) % certificates.length); }, []);
  const prev = () => { directionRef.current = -1; setCurrent((i) => (i - 1 + certificates.length) % certificates.length); };

  // автоплей — сбрасывается при ручном переключении
  const resetTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(next, AUTOPLAY_DELAY);
  }, [next]);

  useEffect(() => {
    resetTimer();
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [current, resetTimer]);

  useEffect(() => {
    if (!slideRef.current) return;
    gsap.fromTo(
      slideRef.current,
      { opacity: 0, x: 20 * directionRef.current },
      { opacity: 1, x: 0, duration: 0.6, ease: "power3.out" }
    );
  }, [current]);

  const handlePrev = () => { prev(); resetTimer(); };
  const handleNext = () => { next(); resetTimer(); };
  const handleDot  = (i: number) => { setCurrent(i); resetTimer(); };

  useGSAP(
    () => {
      gsap.from(".exp-paragraphs p", {
        opacity: 0,
        y: 25,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: ".exp-paragraphs",
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play reverse play reverse",
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="px-6 md:px-[15%] py-8 border-b border-brand-100">
      <div className="grid md:grid-cols-[1fr_2fr] gap-10 md:gap-16">
        {/* текст по центру вертикально, параграфы вылетают снизу */}
        <div className="flex flex-col">
          <h2 className="text-xs tracking-widest uppercase text-brand-300 mb-6">Опыт</h2>
          <div className="exp-paragraphs my-auto space-y-3 text-base text-stone-500 leading-snug">
            <p>
              Я окончила Витебский Государственный Университет имени П.М. Машерова в 2021 году по специальности психолог, прошла многочисленные онлайн курсы повышения квалификации.
            </p>
            <p>
              С 2024 года работаю ABA Психологом в Таллиннском Центре Прикладного анализа поведения MTÜ Eriline Lapsepõlv. Окончила полную программу подготовки по специальности «Международный поведенческий аналитик» (IBA).
            </p>
          </div>
        </div>

        {/* сертификаты с автоскроллом */}
        <div className="flex flex-col">
          <h2 className="text-xs tracking-widest uppercase text-brand-300 mb-6">Сертификаты</h2>

          <div ref={slideRef} className="rounded-xl overflow-hidden bg-brand-50 p-4 flex items-center justify-center">
            <Image
              src={certificates[current].src}
              alt={certificates[current].alt}
              width={600}
              height={800}
              className="w-80% h-auto object-contain"
            />
          </div>

          {/* кнопки справа */}
          <div className="mt-4 flex items-center justify-end gap-4">
            <div className="flex items-center gap-2 mr-auto">
              {certificates.map((_, i) => (
                <button
                  key={i}
                  onClick={() => handleDot(i)}
                  className={`rounded-full transition-all ${
                    i === current
                      ? "w-5 h-2 bg-brand-400"
                      : "w-2 h-2 bg-brand-200 hover:bg-brand-300"
                  }`}
                  aria-label={`Сертификат ${i + 1}`}
                />
              ))}
            </div>

            <span className="text-sm text-stone-300 tabular-nums">
              {current + 1} / {certificates.length}
            </span>

            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-full border border-brand-200 text-brand-300 hover:bg-brand-400 hover:text-white hover:border-brand-400 transition-colors flex items-center justify-center"
              aria-label="Предыдущий"
            >
              ←
            </button>
            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full border border-brand-200 text-brand-300 hover:bg-brand-400 hover:text-white hover:border-brand-400 transition-colors flex items-center justify-center"
              aria-label="Следующий"
            >
              →
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
