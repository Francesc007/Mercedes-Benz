import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'mercedes-benz admin',

  projectId: 'nfhji1ic',
  dataset: 'production',

  // BLOQUEO 1: Eliminamos Vision de la lógica del programa
  plugins: [
    structureTool(),
  ],

  schema: {
    types: schemaTypes,
  },

  studio: {
    components: {
      layout: (props) => {
        return (
          <>
            <style>
              {`
                /* BLOQUEO 2: ELIMINAR VISION DEL CENTRO */
                /* Ocultamos cualquier enlace o botón que contenga la palabra Vision */
                a[href*="vision"], 
                button[aria-label="Vision"],
                div[role="tablist"] > a:nth-child(2) { 
                  display: none !important; 
                }

                /* BLOQUEO 3: LADO DERECHO (Usuario y Ayuda) */
                /* Ocultamos todo el grupo de herramientas de la derecha */
                [data-testid="user-menu-button"],
                button:has(svg[data-sanity-icon="help-circle"]),
                button:has(svg[data-sanity-icon="cog"]) {
                  display: none !important;
                }
                
                /* BLOQUEO 4: LADO IZQUIERDO (Nombre del proyecto y Manage Project) */
                /* Atacamos directamente al botón que despliega el menú del proyecto */
                [data-testid="project-menu-button"],
                button:has(svg[data-sanity-icon="chevron-down"]),
                header > div:first-child button {
                  pointer-events: none !important;
                  cursor: default !important;
                }
                
                /* Si el botón de arriba no desaparece, ocultamos el ícono de la flecha */
                /* para que no sientan que es un menú desplegable */
                [data-testid="project-menu-button"] svg {
                  display: none !important;
                }

                /* BLOQUEO 5: BARRA DE BÚSQUEDA */
                [data-testid="search-button"] {
                  display: none !important;
                }
              `}
            </style>
            {props.renderDefault(props)}
          </>
        )
      },
    },
  },
})