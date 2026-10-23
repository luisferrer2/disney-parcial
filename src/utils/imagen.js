export const SIN_IMAGEN =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300"><rect width="300" height="300" fill="#e4e0f2"/><circle cx="150" cy="120" r="46" fill="#b9b2d9"/><rect x="70" y="185" width="160" height="70" rx="35" fill="#b9b2d9"/></svg>'
  );

export function imagenRota(e) {
  e.currentTarget.onerror = null;
  e.currentTarget.src = SIN_IMAGEN;
}
