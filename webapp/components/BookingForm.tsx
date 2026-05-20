import Button from "@/components/ui/Button";

export default function BookingForm() {
  return (
    <section id="bookingform" className="scroll-mt-40 px-6 md:px-[15%] py-10 border-b border-brand-100 bg-brand-50/40">
      <div className="max-w-xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-light leading-tight mb-7 text-stone-700">
          Готовы сделать первый шаг?
        </h2>
        <form className="divide-y divide-brand-100 border-t border-brand-100">
          {[
            { label: "Имя и Фамилия", type: "text", placeholder: "Ваше имя и фамилия" },
          ].map((f) => (
            <div key={f.label} className="py-3 flex items-center gap-4">
              <label className="text-xs tracking-widest uppercase text-brand-300 w-28 shrink-0">{f.label}</label>
              <input type={f.type} placeholder={f.placeholder} className="flex-1 bg-transparent text-base outline-none placeholder:text-stone-300 text-stone-700" />
            </div>
          ))}
          <div className="py-3 flex items-center gap-4">
            <label className="text-xs tracking-widest uppercase text-brand-300 w-28 shrink-0">Услуга</label>
            <select className="flex-1 bg-transparent text-base outline-none text-stone-400 cursor-pointer">
              <option value="">Выберите услугу</option>
              <option value="first">Первичная консультация — 35€</option>
              <option value="repeat">Повторная консультация — 30€</option>
              <option value="pack">Пакет сессий — 240€</option>
            </select>
          </div>
          <div className="py-3 flex items-start gap-4">
            <label className="text-xs tracking-widest uppercase text-brand-300 w-28 shrink-0 pt-0.5">Сообщение</label>
            <textarea placeholder="Кратко опишите запрос" rows={2} className="flex-1 bg-transparent text-base outline-none placeholder:text-stone-300 text-stone-700 resize-none" />
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
        </form>
        <div className="mt-5 flex flex-col items-center gap-2">
          <Button variant="primary" type="submit">Выбрать время</Button>
        </div>
      </div>
    </section>
  );
}
