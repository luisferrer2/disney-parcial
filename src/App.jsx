import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Inicio from "./pages/Inicio.jsx";
import Lista from "./pages/Lista.jsx";
import Detalle from "./pages/Detalle.jsx";
import Favoritos from "./pages/Favoritos.jsx";
import Registro from "./pages/Registro.jsx";
import NoEncontrada from "./pages/NoEncontrada.jsx";
import useFavoritos from "./hooks/useFavoritos.js";

function leerUsuarios() {
  try {
    return JSON.parse(localStorage.getItem("usuarios")) || [];
  } catch {
    return [];
  }
}

export default function App() {
  const { favoritos, alternarFavorito, esFavorito } = useFavoritos();
  const [usuarios, setUsuarios] = useState(leerUsuarios);

  useEffect(() => {
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
  }, [usuarios]);

  return (
    <div className="app">
      <Navbar totalFavoritos={favoritos.length} totalUsuarios={usuarios.length} />
      <main className="contenido">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route
            path="/lista"
            element={<Lista esFavorito={esFavorito} alternarFavorito={alternarFavorito} />}
          />
          <Route
            path="/detalle/:id"
            element={<Detalle esFavorito={esFavorito} alternarFavorito={alternarFavorito} />}
          />
          <Route
            path="/favoritos"
            element={<Favoritos favoritos={favoritos} alternarFavorito={alternarFavorito} />}
          />
          <Route
            path="/registro"
            element={<Registro usuarios={usuarios} setUsuarios={setUsuarios} />}
          />
          <Route path="*" element={<NoEncontrada />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
