import { Portal } from 'radix-ui';
import { PropsWithChildren, useEffect, useState } from 'react';

export default function CustomActions(props: PropsWithChildren) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setReady(true);
    }, 10);
  }, []);

  if (!ready) return null;

  return (
    <Portal.Root container={document.getElementById('portal-actions')}>
      {props.children}
    </Portal.Root>
  );
}
