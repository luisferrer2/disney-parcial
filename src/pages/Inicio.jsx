import { Link } from "react-router-dom";

export default function Inicio() {
  return (
    <section className="hero">
      <h1>Explorador Disney</h1>
      <p>
        En esta página puedes buscar personajes de Disney, ver en qué películas, series y
        videojuegos salen y guardar tus favoritos.
      </p>
      <p>
        Los datos salen de la Disney API, una API gratuita con miles de personajes. También hay
        una sección de registro para agregar usuarios.
      </p>
      <Link to="/lista" className="boton boton-primario boton-grande">
        Ver personajes
      </Link>
    </section>
  );
}
