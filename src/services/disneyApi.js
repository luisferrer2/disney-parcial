const URL_BASE = "https://api.disneyapi.dev";

export async function getPersonajes(pagina, nombre) {
  let url = `${URL_BASE}/character?page=${pagina}&pageSize=12`;
  if (nombre) {
    url += `&name=${encodeURIComponent(nombre)}`;
  }

  const respuesta = await fetch(url);
  if (!respuesta.ok) {
    throw new Error("No se pudo cargar la lista de personajes");
  }

  const json = await respuesta.json();
  let personajes = json.data || [];
  if (!Array.isArray(personajes)) {
    personajes = [personajes];
  }

  return { personajes, totalPaginas: json.info ? json.info.totalPages : 1 };
}

export async function getPersonaje(id) {
  const respuesta = await fetch(`${URL_BASE}/character/${id}`);
  if (!respuesta.ok) {
    throw new Error("No se encontró ese personaje");
  }

  const json = await respuesta.json();
  return json.data;
}
