import { Button } from '@radix-ui/themes';
import { Undo2Icon } from 'lucide-react';

import { useAuth } from '@/hooks/auth';

export function AuthWithoutPermission() {
  const session = useAuth();
  return (
    <div className="flex flex-col items-center justify-center content-center w-full h-screen">
      <img src="/logo.svg" alt="Permissions" className="w-64 h-48" />

      <h2 className="text-xl font-bold text-[#12344A]">oops! Lo siento, no tienes acceso</h2>

      <p className="text-[#12344A] text-center mt-2 mb-2">
        La página a la que intentas acceder tiene acceso restringido.
      </p>

      <Button className="w-[128px] uppercase" onClick={() => session.logout()}>
        <Undo2Icon />
        Salir
      </Button>
    </div>
  );
}
