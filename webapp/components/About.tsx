"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const topics = [
  "Проблемы с межличностными и семейными отношениями",
  "Эмоциональное выгорание",
  "Утрата близких",
  "Стрессы и тревожность",
  "Саморазвитие и самореализация",
  "Разрешение конфликтов",
  "Проблемы с принятием решений",
  "Самооценка и любовь к себе",
];

const notTopics = [
  "Люди младше 20 лет",
  "Наркотическая и алкогольная зависимость",
  "Психиатрические заболевания без сопровождения психиатра",
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

      // цикличная подсветка пунктов "с чем работаю" пока секция видна
      const topicEls = gsap.utils.toArray<Element>(".about-topic", containerRef.current);
      let loopTl: gsap.core.Timeline | null = null;

      function startLoop() {
        if (loopTl) return;
        loopTl = gsap.timeline({ repeat: -1 });
        topicEls.forEach((el) => {
          loopTl!
            .to(el, { scale: 1.04, color: "#44403c", duration: 0.25, ease: "power2.out" })
            .to(el, { scale: 1, color: "#78716c", duration: 0.3, ease: "power2.in" })
            .to({}, { duration: 0.15 }); // пауза между пунктами
        });
      }

      function stopLoop() {
        loopTl?.kill();
        loopTl = null;
        gsap.set(topicEls, { clearProps: "scale,color" });
      }

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 60%",
        end: "bottom 20%",
        onEnter: startLoop,
        onLeave: stopLoop,
        onEnterBack: startLoop,
        onLeaveBack: stopLoop,
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} id="about" className="scroll-mt-20 px-6 md:px-[15%] py-8 border-b border-brand-100">
      <h2 className="text-xs tracking-widest uppercase text-brand-300 mb-6">Обо мне</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">

        <div className="relative w-full aspect-3/4 rounded-2xl overflow-hidden">
          <Image
            src="/images/photo-2.jpg"
            alt="Юлия Миронова"
            fill
            className="object-cover"
          />
        </div>

        <div>
          <p className="text-2xl md:text-3xl font-light leading-snug mb-5 text-stone-700">
            Помогаю разобраться в себе и найти выход из сложных ситуаций.
          </p>
          <div className="about-paragraphs space-y-3 text-base text-stone-500 leading-snug">
            <p>
              В своей практике я использую различные методы, учитывая особенности и потребности каждого клиента.
            </p>
            <p>
              Я специализируюсь на работе с самооценкой и помогаю своим клиентам полюбить себя, а также проработать психологические события, которые могут влиять на их жизнь.
            </p>
            <p>
              Моя основная цель — создать безопасное пространство, где клиент может исследовать свои эмоции, осознать сильные стороны и ресурсы, и научиться принимать себя таким, какой он есть.
            </p>
          </div>
        </div>

        <div className="about-lists space-y-6">
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
            <p className="text-xs tracking-widest uppercase text-brand-300 mb-2.5">С чем не работаю</p>
            <ul className="space-y-1">
              {notTopics.map((t) => (
                <li key={t} className="about-list-item text-base text-stone-400 flex items-start gap-2">
                  <span className="text-stone-300 shrink-0">—</span>{t}
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
}
