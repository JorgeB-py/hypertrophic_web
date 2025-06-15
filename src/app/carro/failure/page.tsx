import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function FailurePage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] };
}) {
  const paymentId = searchParams?.payment_id;

  if (!paymentId || Array.isArray(paymentId)) redirect('/');

  const res = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PRIVATE_MP_ACCESS_TOKEN}`,
    },
    next: { revalidate: 0 },
  });

  if (!res.ok) redirect('/');

  const data = await res.json();

  if (data.status !== 'rejected') redirect('/');

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-red-50 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-red-700 mb-4 text-center">❌ Pago rechazado</h1>
        <div className="space-y-2 text-sm text-gray-700">
          {searchParams &&
            Object.entries(searchParams).map(([key, value]) => (
              <div key={key} className="flex justify-between border-b py-1">
                <span className="font-medium">{key}</span>
                <span className="text-right">{Array.isArray(value) ? value.join(', ') : value}</span>
              </div>
            ))}
        </div>
        <Link
          href="/"
          className="block mt-6 text-center bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
        >
          Volver al inicio
        </Link>
      </div>
    </main>
  );
}
