"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "@/components/ui/Button";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const reviews = [
  {
    name: "Арина",
    age: 28,
    text: "Очень внимательный и чуткий специалист. После нескольких сессий я наконец почувствовала, что двигаюсь вперёд. Спасибо за поддержку!",
  },
  {
    name: "Анна",
    age: 34,
    text: "Обратилась в сложный период. Юлия помогла структурировать мысли и найти опору внутри себя. Работать с ней комфортно и безопасно.",
  },
  {
    name: "Артём",
    age: 31,
    text: "Долго не решался к психологу. С Юлией было легко с первой встречи. Прошли 8 сессий — изменения заметны и мне, и близким.",
  },
  {
    name: "Светлана",
    age: 42,
    text: "Юлия не навязывает мнение, а помогает самой прийти к пониманию. Каждая сессия — шаг к лучшей версии себя.",
  },
  {
    name: "Полина",
    age: 25,
    text: "Помогла справиться с тревогой, которая мешала жить. Теперь у меня есть инструменты на каждый день.",
  },
  {
    name: "Кристина",
    age: 29,
    text: "Профессионально, тепло, без осуждения. Чувствую себя услышанной и понятой.",
  },
];

function ReviewForm() {
  const [form, setForm] = useState({ name: "", age: "", text: "" });
  const [reviewStatus, setReviewStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.name.trim() || !form.age || !form.text.trim()) return;
    setReviewStatus("loading");
    const res = await fetch("/api/review", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setReviewStatus(res.ok ? "success" : "error");
  };

  if (reviewStatus === "success") {
    return (
      <div className="border border-brand-100 rounded-2xl p-6 bg-brand-50/30 flex flex-col items-center text-center gap-4">
        <p className="text-xs tracking-widest uppercase text-brand-300">Спасибо!</p>
        <p className="text-stone-500 text-sm">Ваш отзыв получен.</p>
        <Button variant="outline" onClick={() => { setForm({ name: "", age: "", text: "" }); setReviewStatus("idle"); }}>
          Оставить ещё отзыв
        </Button>
      </div>
    );
  }

  return (
    <div className="border border-brand-100 rounded-2xl p-6 bg-brand-50/30">
      <p className="text-xs tracking-widest uppercase text-brand-300 mb-4">Оставить отзыв</p>
      <form onSubmit={handleSubmit} className="divide-y divide-brand-100 border-t border-brand-100">
        <div className="py-3 flex items-center gap-3">
          <label className="text-xs tracking-widest uppercase text-brand-300 w-16 shrink-0">Имя</label>
          <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Ваше имя" required className="flex-1 bg-transparent text-base outline-none placeholder:text-stone-300 text-stone-700" />
        </div>
        <div className="py-3 flex items-center gap-3">
          <label className="text-xs tracking-widest uppercase text-brand-300 w-16 shrink-0">Возраст</label>
          <input type="number" name="age" value={form.age} onChange={handleChange} placeholder="Ваш возраст" min={18} max={99} required className="flex-1 bg-transparent text-base outline-none placeholder:text-stone-300 text-stone-700" />
        </div>
        <div className="py-3 flex items-start gap-3">
          <label className="text-xs tracking-widest uppercase text-brand-300 w-16 shrink-0 pt-0.5">Текст</label>
          <textarea name="text" value={form.text} onChange={handleChange} placeholder="Поделитесь своим опытом…" rows={4} required className="flex-1 bg-transparent text-base outline-none placeholder:text-stone-300 text-stone-700 resize-none" />
        </div>
        {reviewStatus === "error" && <p className="pt-2 text-red-400 text-xs">Ошибка отправки. Попробуйте позже.</p>}
        <div className="mt-4">
          <Button variant="primary" type="submit" className="w-full text-center" disabled={reviewStatus === "loading"}>
            {reviewStatus === "loading" ? "Отправка..." : "Отправить"}
          </Button>
        </div>
      </form>
    </div>
  );
}

const N = reviews.length;
const AUTOPLAY = 3500;

function formatAge(age: number): string {
  const mod10 = age % 10;
  const mod100 = age % 100;
  if (mod100 >= 11 && mod100 <= 14) return `${age} лет`;
  if (mod10 === 1) return `${age} год`;
  if (mod10 >= 2 && mod10 <= 4) return `${age} года`;
  return `${age} лет`;
}

function authorLine(r: (typeof reviews)[number]) {
  return r.age ? `${r.name}, ${formatAge(r.age)}` : r.name;
}

export default function Reviews() {
  const slot0 = useRef<HTMLDivElement>(null);
  const slot1 = useRef<HTMLDivElement>(null);
  const quote0 = useRef<HTMLParagraphElement>(null);
  const quote1 = useRef<HTMLParagraphElement>(null);
  const author0 = useRef<HTMLParagraphElement>(null);
  const author1 = useRef<HTMLParagraphElement>(null);

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
    const quotes = [quote0, quote1];
    const authors = [author0, author1];

    const backIdx = 1 - front.current;
    const frontEl = slots[front.current].current;
    const backEl = slots[backIdx].current;

    if (!frontEl || !backEl) { busy.current = false; return; }

    const q = quotes[backIdx].current;
    const a = authors[backIdx].current;
    if (q) q.textContent = `«${reviews[to].text}»`;
    if (a) a.textContent = authorLine(reviews[to]);

    gsap.set(backEl, { opacity: 0, x: dir * 30 });

    const prevFront = front.current;
    front.current = backIdx;
    current.current = to;
    setUiIdx(to);

    gsap.timeline({
      onComplete() {
        const prevEl = slots[prevFront].current;
        if (prevEl) gsap.set(prevEl, { opacity: 0, x: 0 });
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
      .to(backEl,  { opacity: 1, x: 0,          duration: 0.4,  ease: "power3.out" }, 0.15);
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

  return (
    <section id="reviews" className="scroll-mt-40 px-6 md:px-8 lg:px-[15%] py-8 border-b border-brand-100">
      <h2 className="text-xs tracking-widest uppercase text-brand-300 mb-6">Отзывы</h2>

      <div className="grid md:grid-cols-[1fr_300px] gap-10 md:gap-16 items-center">

        <div>
          <div className="relative min-h-45">

            <div ref={slot0} className="flex flex-col justify-between">
              <p ref={quote0} className="text-2xl md:text-3xl font-light text-stone-700 leading-snug mb-6">
                «{reviews[0].text}»
              </p>
              <p ref={author0} className="text-xs tracking-widest uppercase text-brand-300">
                {authorLine(reviews[0])}
              </p>
            </div>

            <div ref={slot1} className="absolute inset-0 flex flex-col justify-between" style={{ opacity: 0 }}>
              <p ref={quote1} className="text-2xl md:text-3xl font-light text-stone-700 leading-snug mb-6">
                «{reviews[1].text}»
              </p>
              <p ref={author1} className="text-xs tracking-widest uppercase text-brand-300">
                {authorLine(reviews[1])}
              </p>
            </div>

          </div>

          <div className="mt-8 flex items-center gap-5">
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
            <div className="flex items-center gap-2 ml-2">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => handleDot(i)}
                  aria-label={`Отзыв ${i + 1}`}
                  className={`rounded-full transition-all ${
                    i === uiIdx
                      ? "w-5 h-2 bg-brand-400"
                      : "w-2 h-2 bg-brand-200 hover:bg-brand-300"
                  }`}
                />
              ))}
            </div>
            <span className="ml-auto text-sm text-stone-300 tabular-nums">
              {uiIdx + 1} / {N}
            </span>
          </div>
        </div>

        <ReviewForm />

      </div>
    </section>
  );
}
