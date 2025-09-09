'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { checkout } from '@/services/checkout.service';
import { useCart } from '@/lib/cartStore';
import { Trash } from 'lucide-react';
import Image from 'next/image';
import { Combobox } from './combobox';
import AlertDialogWrapper from '@/components/shared/alertdialog';
import Loading from '@/app/loading';
import { useWompiCheckout } from '@/hooks/use-wompi-checkout';

export default function Cart() {
  const { items, remove, totalPrice, updateQuantity, loading } = useCart();
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    email: '',
    city: '',
    region: '',
    phone: '',
    document: '',
    type: '',
  });

  const wompiReady = useWompiCheckout();

  const hayCombo = items.some(i => i.category?.toLowerCase() === 'combo');

  const subtotal = totalPrice();
  const envioBase = 0;
  const envioGratisMinimo = 300000;
  const aplicaEnvioGratis = subtotal >= envioGratisMinimo || hayCombo;
  const envio = aplicaEnvioGratis ? 0 : envioBase;
  const total = subtotal + envio;
  const restante = Math.max(envioGratisMinimo - subtotal, 0);

  return (
    <main className="max-w-4xl mx-auto px-6 py-10 text-white">
      <h1 className="text-3xl font-bold mb-6 text-center text-red-500">🛒 Tu Carrito</h1>

      {items.length === 0 ? (
        <p className="text-center text-gray-300">Tu carrito está vacío.</p>
      ) : (
        <>
          {items.map(it => (
            <div
              key={it.id}
              className="flex flex-col sm:flex-row gap-4 mb-4 items-center bg-zinc-900 p-4 rounded-lg shadow-sm"
            >
              <Image
                src={it.image}
                alt={it.name}
                width={80}
                height={80}
                className="w-20 h-20 object-contain border border-zinc-700 rounded"
              />

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between flex-grow w-full gap-2">
                <div className="flex flex-col">
                  <p className="font-medium text-lg">{it.name}</p>
                  <p className="text-sm text-gray-400">${it.price.toLocaleString()}</p>
                </div>

                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    value={it.qty || 1}
                    min={0}
                    onChange={(e) => {
                      const val = e.target.value;
                      const quantity = parseInt(val);

                      if (val === '') {
                        updateQuantity(it.id, 0);
                        return;
                      }

                      if (!isNaN(quantity)) {
                        if (quantity <= 0) {
                          remove(it.id);
                        } else {
                          updateQuantity(it.id, quantity);
                        }
                      }
                    }}
                    className="w-20 text-center border-zinc-700 bg-zinc-800 text-white"
                  />

                  <Button
                    variant="ghost"
                    onClick={() => remove(it.id)}
                    className="text-red-500 hover:bg-zinc-800"
                  >
                    <Trash />
                  </Button>
                </div>
              </div>
            </div>
          ))}

          {/* Datos cliente */}
          <div className="mt-10 bg-zinc-900 p-6 rounded-lg shadow-md space-y-4">
            <h2 className="text-xl font-semibold text-red-400">Datos del cliente</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                placeholder="Nombre completo"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="bg-zinc-800 text-white border-zinc-700"
              />
              <div className="md:col-span-1">
                <Combobox
                  options={[
                    { label: 'Cédula de Ciudadanía', value: 'CC' },
                    { label: 'Cédula de Extranjería', value: 'CE' },
                    { label: 'NIT', value: 'NIT' },
                    { label: 'Tarjeta de Identidad', value: 'TI' },
                    { label: 'Pasaporte', value: 'PA' },
                    { label: 'Registro Civil', value: 'RC' },
                  ]}
                  placeholder="Tipo de documento"
                  value={formData.type}
                  onChange={value => setFormData({ ...formData, type: value })}
                  className="bg-zinc-800 text-white border-zinc-700 w-full"
                />
              </div>
              <Input
                placeholder="Correo electrónico"
                type="email"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="bg-zinc-800 text-white border-zinc-700"
              />
              <Input
                placeholder="Documento"
                value={formData.document}
                onChange={e => setFormData({ ...formData, document: e.target.value })}
                className="bg-zinc-800 text-white border-zinc-700"
              />
              <Input
                placeholder="Dirección de envío"
                value={formData.address}
                onChange={e => setFormData({ ...formData, address: e.target.value })}
                className="md:col-span-2 bg-zinc-800 text-white border-zinc-700"
              />
              <Input
                placeholder="Ciudad"
                value={formData.city}
                onChange={e => setFormData({ ...formData, city: e.target.value })}
                className="bg-zinc-800 text-white border-zinc-700"
              />
              <Input
                placeholder="Región"
                value={formData.region}
                onChange={e => setFormData({ ...formData, region: e.target.value })}
                className="bg-zinc-800 text-white border-zinc-700"
              />
              <Input
                placeholder="Teléfono"
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                className="md:col-span-2 bg-zinc-800 text-white border-zinc-700"
              />
            </div>
          </div>

          {/* Aviso de envío */}
          {!aplicaEnvioGratis && (
            <p className="mt-6 text-sm text-yellow-400 text-center">
              🚚 Te faltan ${restante.toLocaleString()} para tener envío gratis.
            </p>
          )}

          {/* Resumen */}
          <div className="mt-6 bg-zinc-900 p-6 rounded-lg shadow-md space-y-4">
            <div className="flex justify-between">
              <span className="text-lg">Subtotal</span>
              <span className="text-lg font-semibold text-white">
                ${subtotal.toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-lg">Envío</span>
              <span
                className={`text-lg font-semibold ${
                  aplicaEnvioGratis ? 'text-green-400 line-through' : 'text-white'
                }`}
              >
                ${envioBase.toLocaleString()}
              </span>
            </div>

            {aplicaEnvioGratis && (
              <div className="text-sm text-green-400 text-right">
                ¡Felicidades! Tu envío es gratis 🎉
              </div>
            )}

            <div className="flex justify-between border-t border-zinc-700 pt-4">
              <span className="text-xl font-semibold text-red-400">Total a pagar</span>
              <span className="text-xl font-bold text-white">
                ${total.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Botón checkout */}
          <Button
            className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold disabled:opacity-50"
            disabled={!wompiReady}
            onClick={() => {
              const camposVacios = Object.entries(formData).filter(([, v]) => !v.trim());
              if (camposVacios.length > 0) {
                setAlertMessage(
                  'Por favor completa todos los campos antes de continuar con el pago.'
                );
                setShowAlert(true);
                return;
              }

              checkout(items, formData, envio);
            }}
          >
            {wompiReady ? 'Finalizar compra' : 'Cargando Wompi...'}
          </Button>

          {showAlert && (
            <AlertDialogWrapper
              open={showAlert}
              onOpenChange={setShowAlert}
              title="Campos incompletos"
              description={alertMessage}
              boton="Entendido"
              action={() => setShowAlert(false)}
            />
          )}
        </>
      )}
    </main>
  );
}
