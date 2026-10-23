export default function FormularioUsuario({
  valores,
  editando,
  onCambio,
  onEnviar,
  onCancelar,
}) {
  return (
    <form className="formulario" onSubmit={onEnviar} noValidate>
      <h2>{editando ? "Editar usuario" : "Nuevo usuario"}</h2>

      <div className="campo">
        <label htmlFor="identificacion">Identificación</label>
        <input
          id="identificacion"
          name="identificacion"
          type="text"
          inputMode="numeric"
          value={valores.identificacion}
          onChange={onCambio}
        />
      </div>

      <div className="campo">
        <label htmlFor="nombre">Nombre</label>
        <input id="nombre" name="nombre" type="text" value={valores.nombre} onChange={onCambio} />
      </div>

      <div className="campo">
        <label htmlFor="correo">Correo</label>
        <input id="correo" name="correo" type="email" value={valores.correo} onChange={onCambio} />
      </div>

      <div className="acciones">
        <button type="submit" className="boton boton-primario">
          {editando ? "Guardar cambios" : "Registrar"}
        </button>
        {editando && (
          <button type="button" className="boton" onClick={onCancelar}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}
