export default function Alerta({ tipo, texto }) {
  return <p className={`alerta alerta-${tipo}`}>{texto}</p>;
}
