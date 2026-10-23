import { Link } from "react-router-dom";
import { SIN_IMAGEN, imagenRota } from "../utils/imagen.js";

export default function Tarjeta({ personaje, esFavorito, onAlternar }) {
  return (
    <article className="tarjeta">
      <Link to={`/detalle/${personaje._id}`} className="tarjeta-enlace">
        <img
          src={personaje.imageUrl || SIN_IMAGEN}
          onError={imagenRota}
          alt={personaje.name}
          loading="lazy"
        />
        <h3>{personaje.name}</h3>
      </Link>
      <button
       
        className={esFavorito ? "boton boton-favorito activo" : "boton boton-favorito"}
       
        onClick={() => onAlternar(personaje)}
      >
        {esFavorito ? "Quitar de favoritos" : "Guardar en favoritos"}
      </button>
    </article>
  );
}
