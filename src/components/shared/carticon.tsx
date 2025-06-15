'use client';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/lib/cartStore';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';

export default function CartIcon() {
  const total = useCart(state => state.totalItems());
  const router=useRouter();

  return (
    <Button className="relative cursor-pointer" onClick={()=>router.push('/carro')}>
      <ShoppingCart className="w-6 h-6" />
      {total > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white
                         rounded-full text-xs w-5 h-5 flex items-center
                         justify-center">
          {total}
        </span>
      )}
    </Button>
  );
}
