import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const res = await fetch('https://us-central1-hypertrophic-ea1ce.cloudfunctions.net/createPreference', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      throw new Error('Error al crear preferencia');
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error('[create-preference] ERROR', err);
    return NextResponse.json({ error: 'Error interno al crear preferencia' }, { status: 500 });
  }
}
