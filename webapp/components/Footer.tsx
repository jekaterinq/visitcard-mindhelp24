import { FaInstagram, FaTelegram, FaEnvelope, FaPhoneAlt, FaWhatsapp, FaViber } from "react-icons/fa";

export default function Footer() {
  return (
    <footer id="footer" className="px-6 md:px-8 lg:px-[15%] py-8 bg-brand-50/30">

      <div>
        <span className="text-xs tracking-widest uppercase text-brand-300 block mb-4">Контакты</span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-base text-stone-400">

          <div className="space-y-2">
            <a href="tel:+37258240511" className="flex items-center gap-2 hover:text-brand-400 transition-colors">
              <FaPhoneAlt className="shrink-0" />
              +372 5824 0511
            </a>
            <a href="mailto:mindhelp24.info@gmail.com" className="flex items-center gap-2 hover:text-brand-400 transition-colors">
              <FaEnvelope className="shrink-0" />
              mindhelp24.info@gmail.com
            </a>
          </div>

          <div className="space-y-2">
            <a href="https://wa.me/37258240511" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-brand-400 transition-colors">
              <FaWhatsapp className="shrink-0" />
              WhatsApp
            </a>
            <a href="viber://chat?number=%2B37258240511" className="flex items-center gap-2 hover:text-brand-400 transition-colors">
              <FaViber className="shrink-0" />
              Viber
            </a>
          </div>

          <div className="space-y-2">
            <a href="https://www.instagram.com/psychologistyuliya" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-brand-400 transition-colors">
              <FaInstagram className="shrink-0" />
              Instagram
            </a>
            <a href="https://t.me/Yuliya_Mironava" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-brand-400 transition-colors">
              <FaTelegram className="shrink-0" />
              Telegram
            </a>
          </div>

        </div>
      </div>

      <div className="mt-6 flex items-center justify-between text-sm text-stone-300">
        <span>© 2026 MindHelp24</span>
        <span>by{" "}
          <a
            href="https://jekaterinq.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline text-stone-300"
          >
            jekaterinq
          </a>.
        </span>
      </div>
    </footer>
  );
}
