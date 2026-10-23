import { NavLink } from "react-router-dom";

const claseEnlace = ({ isActive }) => (isActive ? "enlace activo" : "enlace");

export default function Navbar({ totalFavoritos, totalUsuarios }) {
  return (
    <header className="navbar">
      <div className="navbar-interior">
        <NavLink to="/" className="marca">
          Explorador Disney
        </NavLink>
        <nav className="navbar-enlaces">
          <NavLink to="/" end className={claseEnlace}>
            Inicio
          </NavLink>
          <NavLink to="/lista" className={claseEnlace}>
            Lista
          </NavLink>
          <NavLink to="/favoritos" className={claseEnlace}>
            Favoritos <span className="contador">{totalFavoritos}</span>
          </NavLink>
          <NavLink to="/registro" className={claseEnlace}>
            Registro <span className="contador">{totalUsuarios}</span>
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
