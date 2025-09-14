// components/AlertDialogWrapper.tsx
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogCancel
} from '@/components/ui/alert-dialog';

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  title: string;
  description: string;
  boton:string;
  secondaryBoton?:string;
  secondaryAction?: ()=> void;
  action: ()=> void;
}

export default function AlertDialogWrapper({
  open,
  onOpenChange,
  title,
  secondaryAction,
  description,
  boton,
  secondaryBoton,
  action,
}: Props) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={secondaryAction} className='cursor-pointer'>
            {secondaryBoton}
          </AlertDialogCancel>
          <AlertDialogAction onClick={action} className='cursor-pointer'>
            {boton}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
