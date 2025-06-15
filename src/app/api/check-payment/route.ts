// app/api/check-payment/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { paymentId } = await req.json();

  const res = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PRIVATE_MP_ACCESS_TOKEN}`,
    },
  });

  if (!res.ok) {
    return NextResponse.json({ ok: false }, { status: 500 });
  }

  const data = await res.json();
  return NextResponse.json(data);
}
