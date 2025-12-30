import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {schemaTypes} from './schemaTypes'
import {createElement} from 'react'

export default defineConfig({
  name: 'default',
  title: 'Mercedes-Benz Admin',

  projectId: 'nfhji1ic',
  dataset: 'production',

  plugins: [structureTool()],

  schema: {
    types: schemaTypes,
  },

  studio: {
    components: {
      layout: (props) => {
        return createElement('div', null, 
          createElement('style', null, `
            /* OCULTAR VISION Y BUSQUEDA */
            a[href*="vision"], 
            [data-testid="search-button"] { 
              display: none !important; 
            }

            /* BLOQUEO DERECHO */
            [data-testid="user-menu-button"],
            [data-testid="help-menu-button"] {
              display: none !important;
            }
            
            /* BLOQUEO IZQUIERDO DEFINITIVO */
            /* En lugar de ocultarlo, lo volvemos "intocable" */
            [data-testid="project-menu-button"] {
              pointer-events: none !important;
              cursor: default !important;
            }
            
            /* Quitamos la flecha para que el cliente no crea que se abre */
            [data-testid="project-menu-button"] [data-slot="icon"] {
              display: none !important;
            }

            /* OCULTAR ESPECIFICAMENTE EL MANAGE PROJECT SI APARECE */
            /* Este selector busca el botón por su contenido de texto */
            button:contains("Manage project"), 
            a:contains("Manage project") {
              display: none !important;
            }
          `),
          props.renderDefault(props)
        )
      },
    },
  },
})