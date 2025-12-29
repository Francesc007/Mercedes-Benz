import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'delivery',
  title: 'Entregas',
  type: 'document',
  fields: [
    defineField({
      name: 'NombreCliente',
      title: 'Nombre del Cliente',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'Ubicacion',
      title: 'Ubicación (ej: Cancún)',
      type: 'string',
    }),
    defineField({
      name: 'ModeloAuto',
      title: 'Modelo de Auto entregado',
      type: 'string',
    }),
    defineField({
      name: 'FotoCliente',
      title: 'Foto con cliente',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'Descripcion',
      title: 'Testimonio / Descripción',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'NombreCliente',
      subtitle: 'Descripcion',
      media: 'FotoCliente',
    },
  },
})
