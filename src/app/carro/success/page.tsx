import { Suspense } from 'react';
import SuccessPageContent from '@/components/shared/successpage';

export default function SuccessPage() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <SuccessPageContent />
    </Suspense>
  );
}
