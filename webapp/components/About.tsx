"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const topics = [
  "Самооценка и самоценность",
  "Эмоциональное выгорание",
  "Последствия психотравмы",
  "Внутренний критик",
  "Горе и утрата",
  "Подавленные эмоции",
];

const understandTopics = [
  "Себя",
  "Свои внутренние состояния",
  "Свои реакции и чувства",
  "Последствия прошлого опыта",
  "Почему внутри так тяжело",
  "Как перестать бороться с собой",
];

export default function About() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const scrollOpts = {
        start: "top 75%",
        end: "bottom 20%",
        toggleActions: "play reverse play reverse",
      };

      gsap.from(".about-paragraphs p", {
        opacity: 0,
        y: 25,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: { trigger: ".about-paragraphs", ...scrollOpts },
      });

      gsap.from(".about-list-item", {
        opacity: 0,
        duration: 0.4,
        ease: "power2.out",
        stagger: 0.06,
        scrollTrigger: { trigger: ".about-lists", ...scrollOpts },
      });

      const topicEls = gsap.utils.toArray<Element>(".about-topic", containerRef.current);
      const loopTl = gsap.timeline({ repeat: -1 });
      topicEls.forEach((el) => {
        loopTl
          .to(el, { scale: 1.04, color: "#44403c", duration: 0.25, ease: "power2.out" })
          .to(el, { scale: 1, color: "#78716c", duration: 0.3, ease: "power2.in" })
          .to({}, { duration: 0.15 });
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} id="about" className="scroll-mt-20 px-6 md:px-8 lg:px-[15%] py-8 border-b border-brand-100">
      <h2 className="text-xs tracking-widest uppercase text-brand-300 mb-6">Обо мне</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">

        <div className="relative w-full aspect-3/4 rounded-2xl overflow-hidden">
          <Image
            src="/images/photo-2.jpg"
            alt="Юлия Миронова"
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
            loading="eager"
            priority
          />
        </div>

        <div className="md:order-3 lg:order-2 md:col-span-2 lg:col-span-1">
          <p className="text-2xl md:text-3xl font-light leading-snug mb-5 text-stone-700">
            Помогаю разобраться в себе и найти выход из сложных ситуаций.
          </p>
          <div className="about-paragraphs space-y-3 text-base text-stone-500 leading-snug">
            <p>
              В своей работе я использую интегративный подход, IFS (Internal Family Systems) и методы работы с психотравмой. Бережно помогаю лучше понимать себя, свои внутренние состояния и причины эмоциональных переживаний.
            </p>
            <p>
              Моя цель — не затягивать терапию на годы, а помочь человеку лучше понять себя, свои состояния и найти внутреннюю опору.
            </p>
          </div>
        </div>

        <div className="about-lists space-y-6 md:order-2 lg:order-3">
          <div>
            <p className="text-xs tracking-widest uppercase text-brand-300 mb-2.5">С чем работаю</p>
            <ul className="space-y-1">
              {topics.map((t) => (
                <li key={t} className="about-list-item about-topic text-base text-stone-500 flex items-start gap-2">
                  <span className="text-brand-200 shrink-0">—</span>{t}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs tracking-widest uppercase text-brand-300 mb-2.5">Помогаю понять</p>
            <ul className="space-y-1">
              {understandTopics.map((t) => (
                <li key={t} className="about-list-item about-topic text-base text-stone-500 flex items-start gap-2">
                  <span className="text-brand-200 shrink-0">—</span>{t}
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
}
