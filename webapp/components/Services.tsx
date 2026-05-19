import Button from "@/components/ui/Button";

const services = [
  {
    number: "01",
    title: "Первичная консультация",
    price: "35€",
    description: "Знакомство, обозначение запроса и целей работы. 60 минут онлайн.",
  },
  {
    number: "02",
    title: "Повторная консультация",
    price: "30€",
    description: "Регулярные сессии в рамках терапевтического процесса. 60 минут.",
  },
  {
    number: "03",
    title: "Пакет 8 сессий",
    price: "240€",
    description: "Восемь встреч по выгодной цене для углублённой работы с запросом.",
  },
];

export default function Services() {
  return (
    <section id="services" className="px-6 md:px-[15%] py-8 border-b border-brand-100 bg-brand-50/20">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xs tracking-widest uppercase text-brand-300">Услуги</h2>
        <p className="text-sm text-stone-400 hidden md:block">Zoom · Teams · Telegram · WhatsApp</p>
      </div>
      <div className="divide-y divide-brand-100">
        {services.map((s) => (
          <div key={s.number} className="py-4 grid md:grid-cols-[60px_1fr_100px_1fr] gap-3 md:gap-6 items-baseline">
            <span className="text-base text-brand-200">{s.number}</span>
            <h3 className="text-lg font-light text-stone-700">{s.title}</h3>
            <p className="text-lg font-light tabular-nums text-brand-400">{s.price}</p>
            <p className="text-base text-stone-500 leading-snug">{s.description}</p>
          </div>
        ))}
      </div>
      <div className="justify-items-center">
        <div className="mt-5 pt-5 border-t border-brand-100 flex flex-col md:flex-row gap-4 text-base text-stone-500">
          <p><span className="text-xs tracking-widest uppercase text-brand-300 mr-2">Формат</span>60 минут онлайн.</p>
          <p className="md:ml-8"><span className="text-xs tracking-widest uppercase text-brand-300 mr-2">Оплата</span>До сессии. Перенос не менее чем за 24 часа.</p>
        </div>
        <div className="mt-5 text-base text-stone-400">
          <Button variant="primary" href="#bookingform">Записаться на сессию</Button>
        </div>
      </div>
      
    </section>
  );
}
