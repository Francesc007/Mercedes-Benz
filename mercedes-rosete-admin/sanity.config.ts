import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {schemaTypes} from './schemaTypes'
import {createElement} from 'react'

export default defineConfig({
  name: 'default',
  title: 'Mercedes-Benz Admin',

  projectId: 'nfhji1ic',
  dataset: 'production',

  // Mantenemos StructureTool para que aparezcan tus secciones de Autos y Entregas
  plugins: [structureTool()],

  schema: {
    types: schemaTypes,
  },

  studio: {
    components: {
      layout: (props) => {
        return createElement('div', null, 
          createElement('style', null, `
            /* 1. ELIMINAR VISION Y GESTIÓN (Cualquier rastro) */
            a[href*="vision"], 
            button[aria-label="Vision"],
            /* Oculta cualquier botón o enlace que diga "Manage project" */
            button:has(span:contains("Manage project")),
            a:has(span:contains("Manage project")),
            [data-testid="action-intent-manage-project"] {
              display: none !important;
            }

            /* 2. LADO DERECHO (Usuario y Ayuda) */
            [data-testid="user-menu-button"],
            [data-testid="help-menu-button"],
            button:has(svg[data-sanity-icon="help-circle"]),
            button:has(svg[data-sanity-icon="cog"]) {
              display: none !important;
            }
            
            /* 3. LADO IZQUIERDO (Bloqueo del menú del nombre) */
            /* Bloqueamos el clic para que no despliegue el "Manage Project" ahí */
            [data-testid="project-menu-button"],
            header div:first-child button {
              pointer-events: none !important;
              cursor: default !important;
            }
            
            /* Ocultamos la flecha para que parezca texto estático */
            [data-testid="project-menu-button"] svg {
              display: none !important;
            }

            /* 4. ASEGURAR QUE "STRUCTURE" SE VEA */
            /* Si Sanity lo ocultó por error, esto lo fuerza a aparecer */
            a[href*="structure"], 
            button[aria-label="Structure"] { 
              display: flex !important; 
            }

            /* 5. OCULTAR BARRA DE BÚSQUEDA */
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