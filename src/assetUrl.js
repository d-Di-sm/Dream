/**
 * Vite serves `public/` at the site root (with `base` applied). All raster assets
 * for this app live under `public/images/` → URLs `${BASE_URL}images/...`.
 */
export const PUBLIC_IMAGES = 'images'

/** Any file under `public/` (e.g. `public/favicon.ico`). */
export function assetUrl(path) {
  const p = path.startsWith('/') ? path.slice(1) : path
  const base = import.meta.env.BASE_URL
  const prefix = base.endsWith('/') ? base : `${base}/`
  return `${prefix}${p}`
}

/** File name or path inside `public/images/` (e.g. `publicImage('01.jpg')`). */
export function publicImage(filename) {
  const name = filename.replace(/^\/+/, '')
  return assetUrl(`${PUBLIC_IMAGES}/${name}`)
}
