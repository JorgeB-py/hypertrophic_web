import { redirect } from 'next/navigation';

export default async function PendingPage({ searchParams }: { searchParams: { [key: string]: string } }) {
  const paymentId = searchParams.payment_id;

  if (!paymentId) redirect('/');

  const res = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PRIVATE_MP_ACCESS_TOKEN}`,
    },
    next: { revalidate: 0 },
  });

  if (!res.ok) redirect('/');

  const data = await res.json();

  if (data.status !== 'in_process') redirect('/');

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-yellow-50 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-yellow-700 mb-4 text-center">⏳ Pago en proceso</h1>
        <div className="space-y-2 text-sm text-gray-700">
          {Object.entries(searchParams).map(([key, value]) => (
            <div key={key} className="flex justify-between border-b py-1">
              <span className="font-medium">{key}</span>
              <span className="text-right">{value}</span>
            </div>
          ))}
        </div>
        <a href="/" className="block mt-6 text-center bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-2 px-4 rounded">
          Volver al inicio
        </a>
      </div>
    </main>
  );
}
