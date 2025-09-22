import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  context: any
) {
  try {
    const { code } = context.params;
    const apiUrl = `${process.env.NEXT_PRIVATE_API}/get-coupon/${code}`;

    const response = await fetch(apiUrl);

    if (!response.ok) {
      return NextResponse.json(
        { success: false, error: "Cupón no encontrado" },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json({ success: true, ...data });
  } catch (error) {
    console.error("Error en /api/get-coupon:", error);
    return NextResponse.json(
      { success: false, error: "Error interno" },
      { status: 500 }
    );
  }
}
