import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { name, age, text } = await req.json();

  if (!name || !text) {
    return NextResponse.json({ error: "Заполните обязательные поля" }, { status: 400 });
  }

  try {
    await resend.emails.send({
      from: "MindHelp24 <noreply@mindhelp24.com>",
      to: "mindhelp24.info@gmail.com",
      subject: `Новый отзыв от ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; font-size: 15px; color: #333; line-height: 1.6;">
          <h2 style="font-weight: normal; font-size: 20px;">Новый отзыв с сайта</h2>
          <p style="margin: 0;"><strong>Имя:</strong> ${name}</p>
          ${age ? `<p style="margin: 0;"><strong>Возраст:</strong> ${age}</p>` : ""}
          <p style="margin-top: 12px;"><strong>Отзыв:</strong><br/>${text}</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Ошибка отправки" }, { status: 500 });
  }
}
