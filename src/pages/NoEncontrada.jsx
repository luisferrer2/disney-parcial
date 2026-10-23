import { Link } from "react-router-dom";

export default function NoEncontrada() {
  return (
    <section className="hero">
      <h1>404</h1>
      <p>Esta página no existe.</p>
      <Link to="/" className="boton boton-primario boton-grande">
        Volver al inicio
      </Link>
    </section>
  );
}
