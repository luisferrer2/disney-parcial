export default function ListaUsuarios({ usuarios, editando, onEditar, onEliminar }) {
  return (
    <section className="lista-usuarios">
      <h2>Usuarios registrados ({usuarios.length})</h2>

      {usuarios.length === 0 ? (
        <p className="texto-suave">Aún no hay usuarios registrados</p>
      ) : (
        <ul>
          {usuarios.map((usuario) => (
            <li
              key={usuario.identificacion}
              className={usuario.identificacion === editando ? "usuario en-edicion" : "usuario"}
            >
              <div>
                <strong>{usuario.nombre}</strong>
                <span>ID {usuario.identificacion}</span>
                <span>{usuario.correo}</span>
              </div>
              <div className="acciones">
                <button className="boton" onClick={() => onEditar(usuario)}>
                  Editar
                </button>
                <button className="boton boton-peligro" onClick={() => onEliminar(usuario)}>
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
