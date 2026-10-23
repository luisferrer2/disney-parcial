import { useEffect, useState } from "react";

export default function useDebounce(valor, retraso = 500) {
  const [valorRetrasado, setValorRetrasado] = useState(valor);

  useEffect(() => {
    const temporizador = setTimeout(() => setValorRetrasado(valor), retraso);
    return () => clearTimeout(temporizador);
  }, [valor, retraso]);

  return valorRetrasado;
}
