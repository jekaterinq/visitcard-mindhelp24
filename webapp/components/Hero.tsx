import Image from "next/image";
import Button from "@/components/ui/Button";

export default function Hero() {
  return (
    <section className="px-6 md:px-[15%] pt-10 pb-8 border-b border-brand-100 bg-brand-50/40">
      <div className="grid md:grid-cols-[1fr_320px] lg:grid-cols-[1fr_380px] gap-8 items-start">
        <div>
          <p className="text-sm tracking-widest uppercase text-brand-300 mb-3">
            Психолог для людей
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light leading-tight tracking-tight max-w-4xl text-stone-800">
            Любую психотравму можно проработать.
          </h1>
          <div className="mt-8 border-t border-brand-100 pt-6 grid sm:grid-cols-3 gap-5">
            <div>
              <p className="text-xs tracking-widest uppercase text-brand-300 mb-1.5">Доступно</p>
              <p className="text-base text-stone-500 leading-snug">
                Цены ниже среднего. Первая консультация — 35€, пакеты со скидкой.
              </p>
            </div>
            <div>
              <p className="text-xs tracking-widest uppercase text-brand-300 mb-1.5">Из любой точки мира</p>
              <p className="text-base text-stone-500 leading-snug">
                Zoom, Teams, Telegram, WhatsApp. Работаю с клиентами по всему миру.
              </p>
            </div>
            <div>
              <p className="text-xs tracking-widest uppercase text-brand-300 mb-1.5">Бесплатно</p>
              <p className="text-base text-stone-500 leading-snug">
                Раз в месяц — бесплатная консультация для тех, кто не может позволить платную.
              </p>
            </div>
          </div>
          <div className="mt-6 flex flex-col items-center md:flex-row md:items-center gap-3">
            <Button variant="primary" href="#bookingform" className="md:px-12 md:py-4 md:text-lg">Записаться на сессию</Button>
          </div>
        </div>

        <div className="relative w-full aspect-3/4 rounded-2xl overflow-hidden">
          <Image
            src="/images/photo-1.jpg"
            alt="Юлия Миронова — психолог"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}
