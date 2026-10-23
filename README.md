# Explorador Disney

Página web hecha con React y Vite para ver personajes de Disney: lista con búsqueda, filtro y paginación, detalle, favoritos y un registro de usuarios (crear, editar y eliminar).

Proyecto de Tecnologías Web · Unidad 2.

## Integrantes

- Luis Ferrer
- Cristian Lauren

## API utilizada

- **Nombre:** Disney API
- **URL base:** `https://api.disneyapi.dev`
- **Documentación:** https://disneyapi.dev/docs

| Uso | Endpoint |
| --- | --- |
| Listado con paginación | `/character?page={n}&pageSize=12` |
| Búsqueda por nombre | `/character?name={texto}&page={n}&pageSize=12` |
| Detalle | `/character/{id}` |

## Pantallas y rutas

| Ruta | Pantalla |
| --- | --- |
| `/` | Inicio |
| `/lista` | Listado, buscador, filtro y paginación |
| `/detalle/:id` | Detalle del personaje (`useParams`) |
| `/favoritos` | Favoritos (persisten en `localStorage`) |
| `/registro` | Registro de usuarios (crear, listar, editar, eliminar) |
| `*` | Página 404 |

## Cosas a tener en cuenta

- Los usuarios viven en el estado de `App` (así no se borran al cambiar de página) y además se guardan en `localStorage`, por eso siguen ahí después de recargar.
- Los favoritos se guardan en `localStorage` con el hook `useFavoritos`.
- El buscador espera 500 ms después de escribir (`useDebounce`) para no hacer una petición por cada letra.
- La API no filtra por categoría, entonces el filtro se hace en el cliente sobre los personajes de la página actual.
- Al editar un usuario se puede dejar su misma identificación; solo se rechaza si es de otro usuario.

## Estructura

```
src/
  components/   Navbar, Footer, Tarjeta, Buscador, Estado, Paginacion,
                ListaDatos, Alerta, FormularioUsuario, ListaUsuarios
  pages/        Inicio, Lista, Detalle, Favoritos, Registro, NoEncontrada
  services/     disneyApi.js
  hooks/        useDebounce.js, useFavoritos.js
  utils/        imagen.js
```

## Cómo ejecutarla

```bash
npm install
npm run dev
```

Para generar la versión de producción: `npm run build`.

## Despliegue

Publicada en Vercel (o Netlify). Se incluyen `vercel.json` y `public/_redirects` para que al recargar `/detalle/:id` no aparezca un error 404 del servidor.

## Capturas de pantalla

Agrega aquí las capturas (escritorio y celular) antes de entregar:

![Inicio](capturas/inicio.png)
![Listado](capturas/lista.png)
![Detalle](capturas/detalle.png)
![Registro](capturas/registro.png)
