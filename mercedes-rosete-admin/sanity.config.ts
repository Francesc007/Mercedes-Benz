import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Mercedes-Benz Admin',

  projectId: 'nfhji1ic',
  dataset: 'production',

  // Solo dejamos el structureTool para que vean los autos y entregas
  // Eliminamos visionTool para mayor seguridad
  plugins: [structureTool()],

  schema: {
    types: schemaTypes,
  },

  // Inyectamos CSS para desaparecer los botones de la esquina derecha
  // y cualquier rastro de la gestión de Sanity
  studio: {
    components: {
      layout: (props) => {
        return (
          <>
            <style>
              {`
                /* Oculta el menú del proyecto (donde dice Sanity/Manage) */
                [data-testid="project-menu-button"] { display: none !important; }
                
                /* Oculta el menú de usuario y perfil (esquina derecha) */
                [data-testid="user-menu-button"] { display: none !important; }
                
                /* Oculta el botón de ayuda y soporte */
                [data-testid="help-menu-button"] { display: none !important; }
                
                /* Oculta el botón de búsqueda global si no lo necesitan */
                [data-testid="search-button"] { display: none !important; }
              `}
            </style>
            {props.renderDefault(props)}
          </>
        )
      },
    },
  },
})