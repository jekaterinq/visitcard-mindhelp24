"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";

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

function formatAge(age: number): string {
  const mod10 = age % 10;
  const mod100 = age % 100;
  if (mod100 >= 11 && mod100 <= 14) return `${age} лет`;
  if (mod10 === 1) return `${age} год`;
  if (mod10 >= 2 && mod10 <= 4) return `${age} года`;
  return `${age} лет`;
}

export default function Reviews() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((i) => (i - 1 + reviews.length) % reviews.length);
  const next = () => setCurrent((i) => (i + 1) % reviews.length);

  return (
    <section id="reviews" className="px-6 md:px-[15%] py-8 border-b border-brand-100">
      <h2 className="text-xs tracking-widest uppercase text-brand-300 mb-6">Отзывы</h2>

      <div className="grid md:grid-cols-[1fr_300px] gap-10 md:gap-16 items-start">

        {/* Carousel */}
        <div>
          <div className="relative min-h-45 flex flex-col justify-between">
            <div key={current} className="animate-fadein">
              <p className="text-2xl md:text-3xl font-light text-stone-700 leading-snug mb-6">
                «{reviews[current].text}»
              </p>
              <p className="text-xs tracking-widest uppercase text-brand-300">
                {reviews[current].name}{reviews[current].age ? `, ${formatAge(reviews[current].age)}` : ""}
              </p>
            </div>
          </div>

          <div className="mt-8 flex items-center gap-5">
            <button onClick={prev} className="w-10 h-10 rounded-full border border-brand-200 text-brand-300 hover:bg-brand-400 hover:text-white hover:border-brand-400 transition-colors flex items-center justify-center" aria-label="Предыдущий">←</button>
            <button onClick={next} className="w-10 h-10 rounded-full border border-brand-200 text-brand-300 hover:bg-brand-400 hover:text-white hover:border-brand-400 transition-colors flex items-center justify-center" aria-label="Следующий">→</button>
            <div className="flex items-center gap-2 ml-2">
              {reviews.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)} className={`rounded-full transition-all ${i === current ? "w-5 h-2 bg-brand-400" : "w-2 h-2 bg-brand-200 hover:bg-brand-300"}`} aria-label={`Отзыв ${i + 1}`} />
              ))}
            </div>
            <span className="ml-auto text-sm text-stone-300 tabular-nums">{current + 1} / {reviews.length}</span>
          </div>
        </div>

        {/* New review form */}
        <div className="border border-brand-100 rounded-2xl p-6 bg-brand-50/30">
          <p className="text-xs tracking-widest uppercase text-brand-300 mb-4">Оставить отзыв</p>
          <form className="space-y-0 divide-y divide-brand-100 border-t border-brand-100">
            <div className="py-3 flex items-center gap-3">
              <label className="text-xs tracking-widest uppercase text-brand-300 w-16 shrink-0">Имя</label>
              <input type="text" placeholder="Ваше имя" className="flex-1 bg-transparent text-base outline-none placeholder:text-stone-300 text-stone-700" />
            </div>
            <div className="py-3 flex items-center gap-3">
              <label className="text-xs tracking-widest uppercase text-brand-300 w-16 shrink-0">Возраст</label>
              <input type="number" placeholder="Ваш возраст" min={18} max={99} className="flex-1 bg-transparent text-base outline-none placeholder:text-stone-300 text-stone-700" />
            </div>
            <div className="py-3 flex items-start gap-3">
              <label className="text-xs tracking-widest uppercase text-brand-300 w-16 shrink-0 pt-0.5">Текст</label>
              <textarea placeholder="Поделитесь своим опытом…" rows={4} className="flex-1 bg-transparent text-base outline-none placeholder:text-stone-300 text-stone-700 resize-none" />
            </div>
          </form>
          <div className="mt-4">
            <Button variant="primary" type="submit" className="w-full text-center">Отправить</Button>
          </div>
        </div>

      </div>
    </section>
  );
}
