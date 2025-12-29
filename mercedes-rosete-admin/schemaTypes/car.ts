import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'car',
  title: 'Automóviles',
  type: 'document',
  fields: [
    defineField({
      name: 'Marca',
      title: 'Marca',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'Modelo',
      title: 'Modelo',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'Anio',
      title: 'Año',
      type: 'number',
      validation: (Rule) => Rule.required().min(1900).max(new Date().getFullYear() + 1),
    }),
    defineField({
      name: 'Precio',
      title: 'Precio',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'Descuento',
      title: 'Porcentaje de Descuento',
      type: 'number',
      validation: (Rule) => Rule.min(0).max(100),
    }),
    defineField({
      name: 'Kilometraje',
      title: 'Kilometraje',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'Aceleracion',
      title: 'Aceleración (0-100 km/h)',
      type: 'string',
    }),
    defineField({
      name: 'Potencia',
      title: 'Potencia (HP)',
      type: 'string',
    }),
    defineField({
      name: 'Motor',
      title: 'Motor',
      type: 'string',
    }),
    defineField({
      name: 'EsNuevo',
      title: '¿Es nuevo?',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'FotoPortada',
      title: 'Foto de portada',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'Galeria',
      title: 'Galería de fotos',
      type: 'array',
      of: [{type: 'image', options: {hotspot: true}}],
    }),
  ],
  preview: {
    select: {
      title: 'Modelo',
      subtitle: 'Marca',
      media: 'FotoPortada',
    },
  },
})
