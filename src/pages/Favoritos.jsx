import { Link } from "react-router-dom";
import Tarjeta from "../components/Tarjeta.jsx";
import Estado from "../components/Estado.jsx";

export default function Favoritos({ favoritos, alternarFavorito }) {
  return (
    <section>
      <h1>Favoritos ({favoritos.length})</h1>

      {favoritos.length === 0 ? (
        <>
          <Estado tipo="vacio" texto="Todavía no has guardado personajes favoritos." />
          <div className="acciones centrado">
            <Link to="/lista" className="boton boton-primario">
              Explorar personajes
            </Link>
          </div>
        </>
      ) : (
        <div className="cuadricula">
          {favoritos.map((personaje) => (
            <Tarjeta
              key={personaje._id}
              personaje={personaje}
              esFavorito={true}
              onAlternar={alternarFavorito}
            />
          ))}
        </div>
      )}
    </section>
  );
}
