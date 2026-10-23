export default function ListaDatos({ titulo, elementos }) {
  const hayDatos = Array.isArray(elementos) && elementos.length > 0;

  return (
    <section className="grupo-datos">
      <h3>
        {titulo} {hayDatos && <span className="contador">{elementos.length}</span>}
      </h3>
      {hayDatos ? (
        <ul>
          {elementos.map((elemento) => (
            <li key={elemento}>{elemento}</li>
          ))}
        </ul>
      ) : (
        <p className="texto-suave">Sin datos registrados.</p>
      )}
    </section>
  );
}
