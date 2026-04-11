/**
 * Mapeo desde la tabla `cars` de Supabase (columnas exactas del API).
 */

function toNumber(v) {
  if (v === undefined || v === null || v === '') return null
  const n = Number(v)
  return Number.isFinite(n) ? n : null
}

function formatAccelerationSeconds(sec) {
  if (sec == null) return null
  const n = Number(sec)
  if (!Number.isFinite(n)) return null
  const s = n % 1 === 0 ? String(n) : n.toFixed(1)
  return `${s} s`
}

function formatPowerHp(hp) {
  if (hp == null) return null
  const n = Number(hp)
  if (!Number.isFinite(n)) return null
  return `${n.toLocaleString('es-MX')} HP`
}

/** condition (texto o similar) → sección nuevos vs seminuevos */
function conditionToEsNuevo(condition) {
  if (condition == null || condition === '') return true
  if (typeof condition === 'boolean') return condition
  const c = String(condition).toLowerCase().trim()
  if (['new', 'nuevo', '0 km', 'zero km'].includes(c)) return true
  if (
    ['used', 'seminuevo', 'usado', 'preowned', 'pre-owned', 'second_hand', 'second-hand'].includes(
      c
    )
  ) {
    return false
  }
  return true
}

export function normalizeCarFromApi(raw) {
  if (!raw || typeof raw !== 'object') {
    return {
      id: undefined,
      Marca: '',
      Modelo: '',
      Anio: null,
      Precio: null,
      Kilometraje: null,
      Aceleracion: null,
      Potencia: null,
      Motor: null,
      EsNuevo: true,
      Descuento: 0,
      FotoPortada: '',
      Galeria: [],
    }
  }

  const id = raw.id != null ? String(raw.id) : undefined

  const marca = String(raw.brand ?? '').trim()
  const modelo = String(raw.model ?? '').trim()

  const precio = toNumber(raw.price)

  const cover = String(raw.cover_image_url ?? '').trim()

  let gallery = []
  if (Array.isArray(raw.gallery_urls)) {
    gallery = raw.gallery_urls.map((u) => String(u).trim()).filter(Boolean)
  }
  if (cover) {
    gallery = gallery.filter((u) => u !== cover)
  }

  const anio = toNumber(raw.year)
  const kilometraje = toNumber(raw.mileage_km)

  const motor =
    raw.engine != null && String(raw.engine).trim() !== ''
      ? String(raw.engine).trim()
      : null

  const Aceleracion = formatAccelerationSeconds(raw.acceleration_0_100_sec)
  const Potencia = formatPowerHp(raw.power_hp)

  const EsNuevo = conditionToEsNuevo(raw.condition)

  const disc = toNumber(raw.discount_percent)
  const Descuento = disc != null && disc > 0 ? disc : 0

  return {
    id,
    Marca: marca,
    Modelo: modelo,
    Anio: anio,
    Precio: precio,
    Kilometraje: kilometraje,
    Aceleracion,
    Potencia,
    Motor: motor,
    EsNuevo,
    Descuento,
    FotoPortada: cover,
    Galeria: gallery,
  }
}

export function parseCarsJson(json) {
  if (Array.isArray(json)) return json
  // Respuesta típica: { data: { cars: [...] } }
  if (Array.isArray(json?.data?.cars)) return json.data.cars
  if (Array.isArray(json?.cars)) return json.cars
  if (Array.isArray(json?.data)) return json.data
  if (Array.isArray(json?.items)) return json.items
  return []
}

/**
 * Obtiene vehículos desde `/api/cars` y devuelve objetos normalizados (Marca, Precio, FotoPortada, etc.).
 */
export async function fetchCars() {
  const res = await fetch('/api/cars')
  if (!res.ok) {
    throw new Error(`Error ${res.status} al obtener /api/cars`)
  }
  const json = await res.json()
  const rawList = parseCarsJson(json)
  return rawList.map(normalizeCarFromApi)
}
