import { supabase } from './supabaseClient'

/**
 * Tabla en Supabase: `landing_interactions` (ver supabase-landing-table.sql).
 * event_type: 'form_submit' | 'whatsapp_click' | 'car_view'
 */
export async function trackLandingEvent(eventType, fields = {}) {
  const {
    nombre,
    whatsapp,
    modeloInteres,
    carId,
    carLabel,
    metadata = {},
  } = fields

  if (!supabase) {
    console.warn(
      '[leads] Supabase no configurado: define VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY en .env.local'
    )
    return { ok: false, skipped: true }
  }

  const row = {
    event_type: eventType,
    nombre: nombre ?? null,
    whatsapp: whatsapp ?? null,
    modelo_interes: modeloInteres ?? null,
    car_id: carId != null ? String(carId) : null,
    car_label: carLabel ?? null,
    metadata:
      metadata && typeof metadata === 'object' ? metadata : {},
  }

  const { error } = await supabase.from('landing_interactions').insert(row)

  if (error) {
    console.error('[leads] Error al guardar en Supabase:', error.message)
    return { ok: false, error }
  }

  return { ok: true }
}
