import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { name, email, phone, service, message } = await req.json();

  if (!name || !email) {
    return NextResponse.json({ error: "Заполните обязательные поля" }, { status: 400 });
  }

  const serviceLabels: Record<string, string> = {
    first: "Первичная консультация — 40€",
    repeat: "Повторная консультация — 35€",
    offline: "Офлайн консультация — 50€",
  };

  try {
    await resend.emails.send({
      from: "MindHelp24 <noreply@mindhelp24.com>",
      to: "mindhelp24.info@gmail.com",
      subject: `Новая заявка от ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; font-size: 15px; color: #333; line-height: 1.6;">
          <h2 style="font-weight: normal; font-size: 20px;">Новая заявка</h2>
          <p style="margin: 0;"><strong>Имя:</strong> ${name}</p>
          <p style="margin: 0;"><strong>Email:</strong> ${email}</p>
          <p style="margin: 0;"><strong>Телефон:</strong> ${phone || "Не указан"}</p>
          <p style="margin: 0;"><strong>Услуга:</strong> ${serviceLabels[service] ?? "Не выбрана"}</p>
          <p style="margin: 0;"><strong>Сообщение:</strong> ${message || "—"}</p>
        </div>
      `,
    });

    await resend.emails.send({
      from: "MindHelp24 <noreply@mindhelp24.com>",
      to: email,
      subject: "Ваша заявка получена",
      html: `
        <div style="font-family: Arial, sans-serif; font-size: 15px; color: #333; line-height: 1.6;">
          <p>Здравствуйте, <strong>${name}!</strong></p>
          <p>Ваша заявка получена. Свяжусь с вами в ближайшее время.</p>
          <p style="font-size: 13px;"><strong>Выбранная услуга:</strong> ${serviceLabels[service] ?? "Не указана"}</p>
          <p style="font-size: 13px;"><strong>Ваше сообщение:</strong> ${message || "—"}</p>
          <p>С уважением,<br/>MindHelp24<br/>Юлия</p>
          <div style="font-size: 12px; color: #aaa; margin-top: 4px;">
            <p style="margin: 0 0 4px;">*Если понадобится связаться раньше — вот мои контакты:</p>
            <p style="margin: 0;">📞 +372 582 405 11</p>
            <p style="margin: 0;">✉️ <a href="mailto:mindhelp24.info@gmail.com" style="color: #aaa;">mindhelp24.info@gmail.com</a></p>
            <p style="margin: 0;">💬 <a href="https://wa.me/37258240511" style="color: #aaa;">WhatsApp</a></p>
            <p style="margin: 0;">📱 <a href="viber://chat?number=%2B37258240511" style="color: #aaa;">Viber</a> <span style="font-size: 11px;">(ссылка открывается только на мобильном устройстве)</span></p>
            <p style="margin: 0;">📸 <a href="https://www.instagram.com/psychologistyuliya" style="color: #aaa;">Instagram</a></p>
            <p style="margin: 0;">✈️ <a href="https://t.me/Yuliya_Mironava" style="color: #aaa;">Telegram</a></p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Ошибка отправки" }, { status: 500 });
  }
}
