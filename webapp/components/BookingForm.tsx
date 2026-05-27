"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";

export default function BookingForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [errors, setErrors] = useState({ name: "", email: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name === "name" || name === "email") setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors = { name: "", email: "" };
    if (!form.name.trim()) newErrors.name = "Введите имя и фамилию";
    if (!form.email.trim()) newErrors.email = "Введите email";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = "Введите корректный email";
    if (newErrors.name || newErrors.email) {
      setErrors(newErrors);
      return;
    }
    setStatus("loading");

    const res = await fetch("/api/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setStatus("success");
    } else {
      setStatus("error");
    }
  };

  const handleReset = () => {
    setForm({ name: "", email: "", phone: "", service: "", message: "" });
    setErrors({ name: "", email: "" });
    setStatus("idle");
  };

  if (status === "success") {
    return (
      <section id="bookingform" className="scroll-mt-40 px-6 md:px-8 lg:px-[15%] py-10 border-b border-brand-100 bg-brand-50/40">
        <div className="max-w-xl mx-auto flex flex-col items-center text-center gap-6 py-10">
          <h2 className="text-3xl md:text-4xl font-light leading-tight text-stone-700">
            Спасибо за доверие!
          </h2>
          <p className="text-stone-500 text-base">
            Подтверждение наличия заявки отправлено на ваш email.<br />
            Юлия свяжется с вами в ближайшее время.
          </p>
          <Button variant="outline" onClick={handleReset}>
            Отправить ещё одну заявку
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section id="bookingform" className="scroll-mt-40 px-6 md:px-8 lg:px-[15%] py-10 border-b border-brand-100 bg-brand-50/40">
      <div className="max-w-xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-light leading-tight mb-7 text-stone-700">
          Готовы сделать первый шаг?
        </h2>
        <form onSubmit={handleSubmit} className="divide-y divide-brand-100 border-t border-brand-100">
          <div className="py-3 flex items-center gap-4">
            <label className="text-xs tracking-widest uppercase text-brand-300 w-28 shrink-0">Имя и Фамилия</label>
            <div className="flex-1">
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Ваше имя и фамилия"
                className="w-full bg-transparent text-base outline-none placeholder:text-stone-300 text-stone-700"
              />
              {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
            </div>
          </div>
          <div className="py-3 flex items-center gap-4">
            <label className="text-xs tracking-widest uppercase text-brand-300 w-28 shrink-0">Email</label>
            <div className="flex-1">
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="example@mail.com (не пишите чужой email)"
                className="w-full bg-transparent text-base outline-none placeholder:text-stone-300 text-stone-700"
              />
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
            </div>
          </div>
          <div className="py-3 flex items-center gap-4">
            <label className="text-xs tracking-widest uppercase text-brand-300 w-28 shrink-0">Телефон</label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="+372 0000 0000"
              required
              className="flex-1 bg-transparent text-base outline-none placeholder:text-stone-300 text-stone-700"
            />
          </div>
          <div className="py-3 flex items-center gap-4">
            <label className="text-xs tracking-widest uppercase text-brand-300 w-28 shrink-0">Услуга</label>
            <select
              name="service"
              value={form.service}
              onChange={handleChange}
              className="flex-1 bg-transparent text-base outline-none text-stone-400 cursor-pointer"
            >
              <option value="">Выберите услугу</option>
              <option value="first">Первичная консультация — 40€</option>
              <option value="repeat">Повторная консультация — 35€</option>
              <option value="offline">Офлайн консультация — 50€</option>
            </select>
          </div>
          <div className="py-3 flex items-start gap-4">
            <label className="text-xs tracking-widest uppercase text-brand-300 w-28 shrink-0 pt-0.5">Сообщение</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Кратко опишите запрос"
              rows={2}
              className="flex-1 bg-transparent text-base outline-none placeholder:text-stone-300 text-stone-700 resize-none"
            />
          </div>
          <span className="text-sm text-stone-400">
            *Перед началом работы клиент обязуется ознакомиться с{" "}
            <a
              href="../../terms"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline text-brand-300"
            >
              памяткой об условиях сотрудничества с психологом
            </a>.
          </span>

          {status === "error" && (
            <p className="pt-3 text-red-400 text-sm">Ошибка отправки. Попробуйте позже.</p>
          )}

          <div className="pt-5 flex flex-col items-center">
            <Button variant="primary" type="submit" disabled={status === "loading"}>
              {status === "loading" ? "Отправка..." : "Связаться по почте"}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
