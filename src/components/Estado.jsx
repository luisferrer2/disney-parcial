export default function Estado({ tipo, texto, onReintentar }) {
  if (tipo === "cargando") {
    return (
      <div className="estado">
        <span className="spinner"></span>
        <p>{texto}</p>
      </div>
    );
  }

  if (tipo === "error") {
    return (
      <div className="estado estado-error">
        <p>{texto}</p>
        {onReintentar && (
          <button className="boton" onClick={onReintentar}>
            Reintentar
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="estado">
      <p>{texto}</p>
    </div>
  );
}
