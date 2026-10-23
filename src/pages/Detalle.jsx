import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Estado from "../components/Estado.jsx";
import ListaDatos from "../components/ListaDatos.jsx";
import { getPersonaje } from "../services/disneyApi.js";
import { SIN_IMAGEN, imagenRota } from "../utils/imagen.js";

export default function Detalle({ esFavorito, alternarFavorito }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [personaje, setPersonaje] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [intento, setIntento] = useState(0);

  useEffect(() => {
    let activo = true;

    async function traerPersonaje() {
      setCargando(true);
      setError("");
      try {
        const datos = await getPersonaje(id);
        if (activo) setPersonaje(datos);
      } catch (e) {
        if (activo) setError(e.message);
      } finally {
        if (activo) setCargando(false);
      }
    }

    traerPersonaje();
    return () => {
      activo = false;
    };
  }, [id, intento]);

  if (cargando) {
    return <Estado tipo="cargando" texto="Cargando personaje..." />;
  }

  if (error || !personaje) {
    return (
      <>
        <Estado
          tipo="error"
          texto={error || "No se encontró ese personaje"}
          onReintentar={() => setIntento(intento + 1)}
        />
        <div className="acciones centrado">
          <button className="boton" onClick={() => navigate("/lista")}>
            Volver al listado
          </button>
        </div>
      </>
    );
  }

  const favorito = esFavorito(personaje._id);

  return (
    <article className="detalle">
      <img
        className="detalle-imagen"
        src={personaje.imageUrl || SIN_IMAGEN}
        onError={imagenRota}
        alt={personaje.name}
      />

      <div className="detalle-info">
        <h1>{personaje.name}</h1>

        <div className="acciones">
          <button
            className={favorito ? "boton boton-favorito activo" : "boton boton-favorito"}
            onClick={() => alternarFavorito(personaje)}
          >
            {favorito ? "Quitar de favoritos" : "Agregar a favoritos"}
          </button>
          <button className="boton" onClick={() => navigate("/lista")}>
            Volver al listado
          </button>
        </div>

        <ListaDatos titulo="Películas" elementos={personaje.films} />
        <ListaDatos titulo="Cortometrajes" elementos={personaje.shortFilms} />
        <ListaDatos titulo="Series de TV" elementos={personaje.tvShows} />
        <ListaDatos titulo="Videojuegos" elementos={personaje.videoGames} />
        <ListaDatos titulo="Atracciones" elementos={personaje.parkAttractions} />
        <ListaDatos titulo="Aliados" elementos={personaje.allies} />
        <ListaDatos titulo="Enemigos" elementos={personaje.enemies} />
      </div>
    </article>
  );
}
