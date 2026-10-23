import { useEffect, useState } from "react";
import Buscador from "../components/Buscador.jsx";
import Tarjeta from "../components/Tarjeta.jsx";
import Estado from "../components/Estado.jsx";
import Paginacion from "../components/Paginacion.jsx";
import useDebounce from "../hooks/useDebounce.js";
import { getPersonajes } from "../services/disneyApi.js";

export default function Lista({ esFavorito, alternarFavorito }) {
  const [busqueda, setBusqueda] = useState("");
  const [filtro, setFiltro] = useState("todos");
  const [pagina, setPagina] = useState(1);
  const [personajes, setPersonajes] = useState([]);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [intento, setIntento] = useState(0);

  const busquedaFinal = useDebounce(busqueda.trim(), 500);

  useEffect(() => {
    let activo = true;

    async function traerPersonajes() {
      setCargando(true);
      setError("");
      try {
        const datos = await getPersonajes(pagina, busquedaFinal);
        if (!activo) return;
        setPersonajes(datos.personajes);
        setTotalPaginas(datos.totalPaginas);
      } catch (e) {
        if (activo) setError(e.message);
      } finally {
        if (activo) setCargando(false);
      }
    }

    traerPersonajes();
    return () => {
      activo = false;
    };
  }, [busquedaFinal, pagina, intento]);

  function cambiarBusqueda(texto) {
    setBusqueda(texto);
    setPagina(1);
  }

  function cambiarPagina(nueva) {
    setPagina(nueva);
    window.scrollTo(0, 0);
  }

  let visibles = personajes;
  if (filtro !== "todos") {
    visibles = personajes.filter((p) => p[filtro] && p[filtro].length > 0);
  }

  return (
    <section>
      <h1>Personajes</h1>

      <div className="controles">
        <Buscador valor={busqueda} onCambio={cambiarBusqueda} />
        <div className="campo">
          <label htmlFor="filtro">Filtrar</label>
          <select id="filtro" value={filtro} onChange={(e) => setFiltro(e.target.value)}>
            <option value="todos">Todos</option>
            <option value="films">Con películas</option>
            <option value="tvShows">Con series de TV</option>
            <option value="videoGames">Con videojuegos</option>
            <option value="parkAttractions">Con atracciones</option>
          </select>
        </div>
      </div>

      {cargando && <Estado tipo="cargando" texto="Cargando personajes..." />}

      {!cargando && error && (
        <Estado tipo="error" texto={error} onReintentar={() => setIntento(intento + 1)} />
      )}

      {!cargando && !error && visibles.length === 0 && (
        <Estado tipo="vacio" texto="No hay personajes para mostrar." />
      )}

      {!cargando && !error && visibles.length > 0 && (
        <div className="cuadricula">
          {visibles.map((personaje) => (
            <Tarjeta
              key={personaje._id}
              personaje={personaje}
              esFavorito={esFavorito(personaje._id)}
              onAlternar={alternarFavorito}
            />
          ))}
        </div>
      )}

      {!error && (
        <Paginacion
          pagina={pagina}
          totalPaginas={totalPaginas}
          onCambiar={cambiarPagina}
          deshabilitado={cargando}
        />
      )}
    </section>
  );
}
