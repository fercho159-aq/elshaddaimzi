"use client";

import { useEffect, useState } from "react";

/** true después del primer render en el navegador (los datos de la demo viven en localStorage). */
export function useMounted() {
  const [m, setM] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setM(true), 0);
    return () => clearTimeout(t);
  }, []);
  return m;
}
