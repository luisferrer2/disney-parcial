import { useEffect, useState } from "react";

function leerFavoritos() {
  try {
    return JSON.parse(localStorage.getItem("favoritos")) || [];
  } catch {
    return [];
  }
}

export default function useFavoritos() {
  const [favoritos, setFavoritos] = useState(leerFavoritos);

  useEffect(() => {
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
  }, [favoritos]);

  function esFavorito(id) {
    return favoritos.some((f) => f._id === id);
  }

  function alternarFavorito(personaje) {
    if (esFavorito(personaje._id)) {
      setFavoritos(favoritos.filter((f) => f._id !== personaje._id));
    } else {
      const nuevo = { _id: personaje._id, name: personaje.name, imageUrl: personaje.imageUrl };
      setFavoritos([...favoritos, nuevo]);
    }
  }

  return { favoritos, esFavorito, alternarFavorito };
}
