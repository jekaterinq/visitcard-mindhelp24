"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const certificates = [
  { src: "/images/certificates/certificate-1.jpg", alt: "Сертификат 1" },
  { src: "/images/certificates/certificate-2.jpg", alt: "Сертификат 2" },
  { src: "/images/certificates/certificate-3.jpg", alt: "Сертификат 3" },
  { src: "/images/certificates/certificate-4.jpg", alt: "Сертификат 4" },
  { src: "/images/certificates/certificate-5.jpg", alt: "Сертификат 5" },
  { src: "/images/certificates/certificate-6.jpg", alt: "Сертификат 6" },
  { src: "/images/certificates/certificate-7.jpg", alt: "Сертификат 7" },
];

const N = certificates.length;
const AUTOPLAY = 3500;

export default function Experience() {
  const containerRef = useRef<HTMLElement>(null);

  const slot0 = useRef<HTMLDivElement>(null);
  const slot1 = useRef<HTMLDivElement>(null);
  const img0 = useRef<HTMLImageElement>(null);
  const img1 = useRef<HTMLImageElement>(null);

  const front = useRef(0);
  const current = useRef(0);
  const busy = useRef(false);
  const paused = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const goRef = useRef<(to: number, dir: 1 | -1) => void>(() => {});

  const [uiIdx, setUiIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const go = useCallback((to: number, dir: 1 | -1) => {
    if (busy.current || to === current.current) return;
    busy.current = true;

    const slots = [slot0, slot1];
    const imgs = [img0, img1];

    const backIdx = 1 - front.current;
    const frontEl = slots[front.current].current;
    const backEl = slots[backIdx].current;
    const backImg = imgs[backIdx].current;

    if (!frontEl || !backEl || !backImg) {
      busy.current = false;
      return;
    }

    backImg.src = certificates[to].src;
    backImg.alt = certificates[to].alt;

    gsap.set(backEl, { opacity: 0, x: dir * 30 });

    const prevFront = front.current;
    front.current = backIdx;
    current.current = to;
    setUiIdx(to);

    gsap.timeline({
      onComplete() {
        const prevEl = slots[prevFront].current;
        if (prevEl) gsap.set(prevEl, { opacity: 0, x: 0 });

        // Preload the next cert into the now-idle slot
        const idleImg = imgs[prevFront].current;
        if (idleImg) {
          idleImg.src = certificates[(to + 1) % N].src;
        }

        busy.current = false;
        if (!paused.current) {
          if (timer.current) clearTimeout(timer.current);
          timer.current = setTimeout(
            () => goRef.current((current.current + 1) % N, 1),
            AUTOPLAY
          );
        }
      },
    })
      .to(frontEl, { opacity: 0, x: -dir * 30, duration: 0.15, ease: "power2.in" }, 0)
      .to(backEl, { opacity: 1, x: 0, duration: 0.4, ease: "power3.out" }, 0.15);
  }, []);

  useEffect(() => {
    goRef.current = go;
    timer.current = setTimeout(
      () => goRef.current((current.current + 1) % N, 1),
      AUTOPLAY
    );
    const a = slot0.current;
    const b = slot1.current;
    return () => {
      if (timer.current) clearTimeout(timer.current);
      gsap.killTweensOf([a, b]);
    };
  }, [go]);

  const handlePrev = () => {
    if (timer.current) clearTimeout(timer.current);
    go((current.current - 1 + N) % N, -1);
  };

  const handleNext = () => {
    if (timer.current) clearTimeout(timer.current);
    go((current.current + 1) % N, 1);
  };

  const handleDot = (i: number) => {
    if (i === current.current || busy.current) return;
    if (timer.current) clearTimeout(timer.current);
    go(i, i > current.current ? 1 : -1);
  };

  const handlePause = () => {
    paused.current = !paused.current;
    setIsPaused(paused.current);
    if (paused.current) {
      if (timer.current) clearTimeout(timer.current);
    } else {
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(
        () => goRef.current((current.current + 1) % N, 1),
        AUTOPLAY
      );
    }
  };

  useGSAP(
    () => {
      gsap.fromTo(
        ".exp-paragraphs p",
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: ".exp-paragraphs",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="px-6 md:px-8 lg:px-[15%] py-8 border-b border-brand-100"
    >
      <div className="grid md:grid-cols-[1fr_2fr] gap-10 md:gap-16">

        <div className="flex flex-col">
          <h2 className="text-xs tracking-widest uppercase text-brand-300 mb-6">Опыт</h2>
          <div className="exp-paragraphs my-auto space-y-3 text-base text-stone-500 leading-snug">
            <p>
              Я окончила Витебский Государственный Университет имени П.М. Машерова по специальности «Психолог».
            </p>
            <p>
              С 2024 года веду частную практику со взрослыми клиентами, работая с самооценкой, внутренними состояниями и последствиями психотравмы. Также с 2024 года работаю ABA-психологом в Таллиннском Центре Прикладного Анализа Поведения MTÜ Eriline Lapsepõlv, сопровождая особенных детей и их семьи.
            </p>
            <p>
              Регулярно прохожу дополнительное обучение и повышение квалификации в области психологии и современных терапевтических подходов.
            </p>
          </div>
        </div>

        <div className="flex flex-col">
          <h2 className="text-xs tracking-widest uppercase text-brand-300 mb-6">Сертификаты</h2>

          <div className="relative w-full aspect-4/3 rounded-xl overflow-hidden bg-brand-50">
            <div ref={slot0} className="absolute inset-0 p-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                ref={img0}
                src={certificates[0].src}
                alt={certificates[0].alt}
                className="w-full h-full object-contain"
              />
            </div>

            <div ref={slot1} className="absolute inset-0 p-4" style={{ opacity: 0 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                ref={img1}
                src={certificates[1 % N].src}
                alt={certificates[1 % N].alt}
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          <div className="mt-4 flex items-center justify-end gap-4">
            <div className="flex items-center gap-2 mr-auto">
              {certificates.map((_, i) => (
                <button
                  key={i}
                  onClick={() => handleDot(i)}
                  aria-label={`Сертификат ${i + 1}`}
                  className={`rounded-full transition-all ${
                    i === uiIdx
                      ? "w-5 h-2 bg-brand-400"
                      : "w-2 h-2 bg-brand-200 hover:bg-brand-300"
                  }`}
                />
              ))}
            </div>

            <span className="text-sm text-stone-300 tabular-nums">
              {uiIdx + 1} / {N}
            </span>

            <button
              onClick={handlePrev}
              aria-label="Предыдущий"
              className="w-10 h-10 rounded-full border border-brand-200 text-brand-300 hover:bg-brand-400 hover:text-white hover:border-brand-400 transition-colors flex items-center justify-center"
            >
              ←
            </button>
            <button
              onClick={handlePause}
              aria-label={isPaused ? "Запустить" : "Пауза"}
              className="w-10 h-10 rounded-full border border-brand-200 text-brand-300 hover:bg-brand-400 hover:text-white hover:border-brand-400 transition-colors flex items-center justify-center text-xs"
            >
              {isPaused ? "▶" : "⏸"}
            </button>
            <button
              onClick={handleNext}
              aria-label="Следующий"
              className="w-10 h-10 rounded-full border border-brand-200 text-brand-300 hover:bg-brand-400 hover:text-white hover:border-brand-400 transition-colors flex items-center justify-center"
            >
              →
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
