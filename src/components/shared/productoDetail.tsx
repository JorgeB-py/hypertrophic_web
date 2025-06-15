'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebaseClient';
import { useCart } from '@/lib/cartStore';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Product } from '@/interfaces/product';
import { Market } from '@/interfaces/market';
import AlertDialogWrapper from './alertdialog';
import { DocumentData } from 'firebase/firestore';


export default function ProductDetail({ id }: { id: string }) {
    const [product, setProduct] = useState<Product | null>(null);
    const [market, setMarket] = useState<Market | null>(null);
    const [open, setOpen] = useState<boolean>(false);

    const add = useCart(state => state.add);
    const router = useRouter();

    /* ───────────── Traer producto y luego marca ───────────── */
    useEffect(() => {
        let isMounted = true;

        (async () => {
            const prodSnap = await getDoc(doc(db, 'productos', id));
            if (!prodSnap.exists() || !isMounted) return;

            const prod = { id: prodSnap.id, ...(prodSnap.data() as DocumentData) } as Product;
            setProduct(prod);

            if (prod.market) {
                const mSnap = await getDoc(doc(db, 'marcas', prod.market));
                if (mSnap.exists() && isMounted) {
                    const marketData = mSnap.data() as DocumentData;
                    const marketObj: Market = {
                        id: mSnap.id,
                        name: marketData.name,
                        image: marketData.image,
                    };
                    setMarket(marketObj);
                }
            }
        })();
        return () => {
            isMounted = false;
        };
    }, [id]);

    /* ───────────── Loading ───────────── */
    if (!product) {
        return (
            <div className="flex justify-center items-center py-20">
                <span className="animate-pulse">Cargando…</span>
            </div>
        );
    }

    /* ───────────── Handlers ───────────── */
    const handleAdd = () => {
        add({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
        });
    }

    const handleBuyNow = () => {
        handleAdd();
        router.push('/carro');
    };

    /* ───────────── Render ───────────── */
    return (
        <>
            <section className="max-w-5xl mx-auto p-6">
                <div className="flex flex-col md:flex-row gap-10">
                    {/* Imagen grande */}
                    <div className="relative w-full md:w-[48%] aspect-square">
                        <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            sizes="(min-width: 768px) 48vw, 100vw"
                            className="object-contain rounded-xl bg-neutral-900"
                            priority
                        />
                    </div>

                    {/* Info y acciones */}
                    <div className="flex-1">
                        <h1 className="text-2xl font-semibold">{product.name}</h1>

                        {market && (
                            <div className="flex items-center gap-2 mb-4">
                                <p className="text-sm text-muted-foreground">Marca:</p>
                                <Image
                                    src={market.image}
                                    alt={market.name}
                                    width={90}
                                    height={28}
                                    className="object-contain"
                                />
                            </div>
                        )}

                        <p className="whitespace-pre-line leading-relaxed mb-8">
                            {product.description}
                        </p>

                        <p className="text-3xl font-bold mb-6">
                            ${product.price.toLocaleString('es-CO')}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button
                                size="lg"
                                className="flex-1 cursor-pointer hover:bg-red-700"
                                disabled={!product.stock}
                                onClick={() => { handleAdd(); setOpen(true) }}
                            >
                                Agregar al carrito
                            </Button>
                            <Button
                                size="lg"
                                variant="secondary"
                                className="flex-1 cursor-pointer"
                                disabled={!product.stock}
                                onClick={handleBuyNow}
                            >
                                Comprar ahora
                            </Button>
                        </div>

                        {!product.stock && (
                            <p className="mt-4 text-red-500">Sin stock disponible</p>
                        )}
                    </div>
                </div>
            </section>
            <AlertDialogWrapper
                open={open}
                onOpenChange={setOpen}
                title="Producto añadido"
                description={`${product?.name ?? ''} se agregó al carrito.`}
                boton="Seguir comprando"
                action={() => { router.push("/catalogo") }}
            />
        </>
    );
}
