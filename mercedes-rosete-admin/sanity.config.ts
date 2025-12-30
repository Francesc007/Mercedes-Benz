import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Mercedes-Benz Admin',

  projectId: 'nfhji1ic',
  dataset: 'production',

  // 1. ELIMINAMOS visionTool() de la lista de plugins. 
  // Esto quita el botón de "Vision" de la parte superior central.
  plugins: [structureTool()],

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
                /* OCULTAR MENÚ DERECHO (Perfil y Ayuda) */
                [data-testid="user-menu-button"],
                [data-testid="help-menu-button"] { 
                  display: none !important; 
                }
                
                /* OCULTAR MENÚ IZQUIERDO (El cuadrito morado y Manage Project) */
                /* Esto evita que al hacer clic en el nombre del proyecto salga el botón de Manage */
                [data-testid="project-menu-button"] { 
                  display: none !important; 
                }

                /* OCULTAR BOTÓN DE VISION (Por si acaso quedara algún rastro visual) */
                /* Aunque lo quitamos de los plugins, esto asegura que no aparezca el enlace */
                a[href*="vision"] { 
                  display: none !important; 
                }

                /* OCULTAR BARRA DE BÚSQUEDA */
                [data-testid="search-button"] { 
                  display: none !important; 
                }
                
                /* OPCIONAL: Si quieres quitar el botón de "Drafts" o estado de publicación */
                /* [data-testid="status-menu-button"] { display: none !important; } */
              `}
            </style>
            {props.renderDefault(props)}
          </>
        )
      },
    },
  },
})