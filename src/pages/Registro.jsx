import { useState } from "react";
import FormularioUsuario from "../components/FormularioUsuario.jsx";
import ListaUsuarios from "../components/ListaUsuarios.jsx";
import Alerta from "../components/Alerta.jsx";

const vacio = { identificacion: "", nombre: "", correo: "" };

export default function Registro({ usuarios, setUsuarios }) {
  const [form, setForm] = useState(vacio);
  const [editando, setEditando] = useState(null);
  const [mensaje, setMensaje] = useState(null);

  function cambiar(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function limpiar() {
    setForm(vacio);
    setEditando(null);
  }

  function enviar(e) {
    e.preventDefault();

    const id = form.identificacion.trim();
    const nombre = form.nombre.trim();
    const correo = form.correo.trim();

    if (id === "" || nombre === "" || correo === "") {
      setMensaje({ tipo: "error", texto: "Todos los campos son obligatorios" });
      return;
    }
    if (!/^[0-9]+$/.test(id)) {
      setMensaje({ tipo: "error", texto: "La identificación solo puede tener números" });
      return;
    }
    if (!correo.includes("@")) {
      setMensaje({ tipo: "error", texto: "El correo debe tener un @" });
      return;
    }

    const repetido = usuarios.some((u) => u.identificacion === id && u.identificacion !== editando);
    if (repetido) {
      setMensaje({ tipo: "error", texto: `Ya existe un usuario con la identificación ${id}` });
      return;
    }

    const usuario = { identificacion: id, nombre, correo };

    if (editando === null) {
      setUsuarios([...usuarios, usuario]);
      setMensaje({ tipo: "exito", texto: `${nombre} fue registrado` });
    } else {
      setUsuarios(usuarios.map((u) => (u.identificacion === editando ? usuario : u)));
      setMensaje({ tipo: "exito", texto: `Se guardaron los cambios de ${nombre}` });
    }
    limpiar();
  }

  function editar(usuario) {
    setForm(usuario);
    setEditando(usuario.identificacion);
    setMensaje(null);
  }

  function cancelar() {
    limpiar();
    setMensaje({ tipo: "info", texto: "Se canceló la edición" });
  }

  function eliminar(usuario) {
    if (!window.confirm(`¿Seguro que quieres eliminar a ${usuario.nombre}?`)) {
      return;
    }

    setUsuarios(usuarios.filter((u) => u.identificacion !== usuario.identificacion));
    if (editando === usuario.identificacion) {
      limpiar();
    }
    setMensaje({ tipo: "exito", texto: `${usuario.nombre} fue eliminado` });
  }

  return (
    <section>
      <h1>Registro de usuarios</h1>
      {mensaje && <Alerta tipo={mensaje.tipo} texto={mensaje.texto} />}

      <div className="registro">
        <FormularioUsuario
          valores={form}
          editando={editando !== null}
          onCambio={cambiar}
          onEnviar={enviar}
          onCancelar={cancelar}
        />
        <ListaUsuarios
          usuarios={usuarios}
          editando={editando}
          onEditar={editar}
          onEliminar={eliminar}
        />
      </div>
    </section>
  );
}
