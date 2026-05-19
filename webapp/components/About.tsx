import Image from "next/image";

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
  return (
    <section id="about" className="px-6 md:px-[15%] py-8 border-b border-brand-100">
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
          <div className="space-y-3 text-base text-stone-500 leading-snug">
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

        <div className="space-y-6">
          <div>
            <p className="text-xs tracking-widest uppercase text-brand-300 mb-2.5">С чем работаю</p>
            <ul className="space-y-1">
              {topics.map((t) => (
                <li key={t} className="text-base text-stone-500 flex items-start gap-2">
                  <span className="text-brand-200 shrink-0">—</span>{t}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs tracking-widest uppercase text-brand-300 mb-2.5">С чем не работаю</p>
            <ul className="space-y-1">
              {notTopics.map((t) => (
                <li key={t} className="text-base text-stone-400 flex items-start gap-2">
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
