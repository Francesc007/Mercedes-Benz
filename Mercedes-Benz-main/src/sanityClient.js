import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: 'nfhji1ic',
  dataset: 'production',
  useCdn: false, // `false` si quieres los datos más frescos siempre
  apiVersion: '2024-03-21', // Usa la fecha actual o una versión estable
})

const builder = imageUrlBuilder(client)

export function urlFor(source) {
  return builder.image(source)
}

