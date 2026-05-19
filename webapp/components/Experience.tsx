"use client";

import { useState } from "react";
import Image from "next/image";

const certificates = [
  { src: "/images/sertificate-test.png", alt: "Сертификат 1" },
  { src: "/images/sertificate-test.png", alt: "Сертификат 2" },
  { src: "/images/sertificate-test.png", alt: "Сертификат 3" },
];

export default function Experience() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((i) => (i - 1 + certificates.length) % certificates.length);
  const next = () => setCurrent((i) => (i + 1) % certificates.length);

  return (
    <section className="px-6 md:px-[15%] py-8 border-b border-brand-100">
      <div className="grid md:grid-cols-[1fr_2fr] gap-10 md:gap-16 items-start">

        {/* Experience text */}
        <div>
          <h2 className="text-xs tracking-widest uppercase text-brand-300 mb-6">Опыт</h2>
          <div className="space-y-3 text-base text-stone-500 leading-snug">
            <p>
              Я окончила Витебский Государственный Университет имени П.М. Машерова в 2021 году по специальности психолог, прошла многочисленные онлайн курсы повышения квалификации.
            </p>
            <p>
              С 2024 года работаю ABA Психологом в Таллиннском Центре Прикладного анализа поведения MTÜ Eriline Lapsepõlv. Окончила полную программу подготовки по специальности «Международный поведенческий аналитик» (IBA).
            </p>
          </div>
        </div>

        {/* Certificates slideshow */}
        <div>
          <h2 className="text-xs tracking-widest uppercase text-brand-300 mb-6">Сертификаты</h2>

          <div key={current} className="animate-fadein rounded-2xl overflow-hidden bg-brand-50 p-4">
            <Image
              src={certificates[current].src}
              alt={certificates[current].alt}
              width={600}
              height={800}
              className="w-full h-auto object-contain"
            />
          </div>

          <div className="mt-4 flex items-center gap-4">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-brand-200 text-brand-300 hover:bg-brand-400 hover:text-white hover:border-brand-400 transition-colors flex items-center justify-center"
              aria-label="Предыдущий"
            >
              ←
            </button>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-brand-200 text-brand-300 hover:bg-brand-400 hover:text-white hover:border-brand-400 transition-colors flex items-center justify-center"
              aria-label="Следующий"
            >
              →
            </button>

            <div className="flex items-center gap-2 ml-1">
              {certificates.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`rounded-full transition-all ${
                    i === current
                      ? "w-5 h-2 bg-brand-400"
                      : "w-2 h-2 bg-brand-200 hover:bg-brand-300"
                  }`}
                  aria-label={`Сертификат ${i + 1}`}
                />
              ))}
            </div>

            <span className="ml-auto text-sm text-stone-300 tabular-nums">
              {current + 1} / {certificates.length}
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
