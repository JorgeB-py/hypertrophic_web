import { CheckoutItem } from '@/interfaces/checkout';
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.NEXT_PRIVATE_RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { nombre, direccion, correo, items, total } = body;

  const html = `
    <h2>🧾 Nuevo pedido recibido</h2>
    <p><strong>Nombre:</strong> ${nombre}</p>
    <p><strong>Correo:</strong> ${correo}</p>
    <p><strong>Dirección:</strong> ${direccion}</p>
    <h3>🛒 Productos:</h3>
    <ul>
      ${items
        .map(
          (item: CheckoutItem) =>
            `<li>${item.quantity} x ${item.title} - $${item.unit_price.toLocaleString()}</li>`
        )
        .join('')}
    </ul>
    <p><strong>Total:</strong> $${total.toLocaleString()}</p>
  `;

  try {
    await resend.emails.send({
      from: 'Hypertrophic <noreply@resend.dev>',
      to: 'hypertrophic27.5@gmail.com', // Cambia por tu correo real
      subject: '🛍️ Nuevo pedido confirmado',
      html,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
