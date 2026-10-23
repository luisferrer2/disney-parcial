export default function Paginacion({ pagina, totalPaginas, onCambiar, deshabilitado }) {
  return (
    <div className="paginacion">
      <button
        className="boton"
        disabled={deshabilitado || pagina === 1}
        onClick={() => onCambiar(pagina - 1)}
      >
        Anterior
      </button>
      <span>
        Página {pagina} de {totalPaginas}
      </span>
      <button
        className="boton"
        disabled={deshabilitado || pagina >= totalPaginas}
        onClick={() => onCambiar(pagina + 1)}
      >
        Siguiente
      </button>
    </div>
  );
}
