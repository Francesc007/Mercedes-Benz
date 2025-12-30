import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {schemaTypes} from './schemaTypes'
import {createElement} from 'react'

export default defineConfig({
  name: 'default',
  title: 'Mercedes-Benz Admin',

  projectId: 'nfhji1ic',
  dataset: 'production',

  // BLOQUEO 1: Quitamos Vision de la lógica
  plugins: [structureTool()],

  schema: {
    types: schemaTypes,
  },

  studio: {
    components: {
      layout: (props) => {
        // BLOQUEO 2: Inyectamos el CSS sin usar etiquetas <> para evitar el error de Vercel
        return createElement('div', null, 
          createElement('style', null, `
            /* ELIMINAR VISION */
            a[href*="vision"], 
            button[aria-label="Vision"],
            div[role="tablist"] > a:nth-child(2) { 
              display: none !important; 
            }

            /* LADO DERECHO (Usuario y Ayuda) */
            [data-testid="user-menu-button"],
            [data-testid="help-menu-button"],
            button:has(svg[data-sanity-icon="help-circle"]),
            button:has(svg[data-sanity-icon="cog"]) {
              display: none !important;
            }
            
            /* LADO IZQUIERDO (Bloqueo total del menú del nombre) */
            [data-testid="project-menu-button"],
            header div:first-child button {
              pointer-events: none !important;
              cursor: default !important;
            }
            
            /* OCULTAR LA FLECHA DE DESPLIEGUE IZQUIERDA */
            [data-testid="project-menu-button"] svg {
              display: none !important;
            }

            /* BARRA DE BÚSQUEDA Y OTROS */
            [data-testid="search-button"] {
              display: none !important;
            }
          `),
          props.renderDefault(props)
        )
      },
    },
  },
})