import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const apiUrl = `${process.env.NEXT_PRIVATE_API}/create-transaction`;

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      return NextResponse.json(
        { success: false, error: "Error en la API privada" },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json({ success: true, ...data });
  } catch (error) {
    console.error("Error en /api/create-transaction:", error);
    return NextResponse.json(
      { success: false, error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
