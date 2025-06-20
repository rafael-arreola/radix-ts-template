import { Button } from '@radix-ui/themes';
import { UndoIcon } from 'lucide-react';

export default function Page404() {
  return (
    <div className="flex flex-1 h-full w-full justify-center items-center flex-col space-y-4">
      <h1 className="text-6xl font-bold">404</h1>
      <h2 className="text-2xl text-gray-600">El sitio que busca no existe o no está disponible.</h2>
      <Button asChild>
        <a href="/">
          <UndoIcon className="" />
          Regresar
        </a>
      </Button>
    </div>
  );
}
