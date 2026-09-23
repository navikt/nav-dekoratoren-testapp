"use client";

import { useCallback, useEffect, useState } from "react";

export function usePersistertAccordionTilstand(storageKey: string) {
  const [apneIder, setApneIder] = useState<Set<string>>(new Set());

  useEffect(() => {
    try {
      const lagret = sessionStorage.getItem(storageKey);
      if (lagret) setApneIder(new Set(JSON.parse(lagret)));
    } catch {}
  }, [storageKey]);

  const settApen = useCallback(
    (id: string, apen: boolean) => {
      setApneIder((forrige) => {
        const neste = new Set(forrige);
        if (apen) neste.add(id);
        else neste.delete(id);

        try {
          sessionStorage.setItem(storageKey, JSON.stringify([...neste]));
        } catch {}

        return neste;
      });
    },
    [storageKey],
  );

  return {
    erApen: (id: string) => apneIder.has(id),
    settApen,
  };
}
