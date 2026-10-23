export default function Buscador({ valor, onCambio }) {
  return (
    <div className="campo">
      <label htmlFor="buscador">Buscar personaje</label>
      <input
        id="buscador"
        type="search"
        placeholder="Ej: Mickey, Elsa, Simba"
        value={valor}
        onChange={(e) => onCambio(e.target.value)}
      />
    </div>
  );
}
