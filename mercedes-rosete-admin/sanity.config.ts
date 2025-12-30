import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {schemaTypes} from './schemaTypes'
import {createElement, Fragment} from 'react'

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
        return createElement(Fragment, null, 
          createElement('style', null, `
            /* 1. CORRECCIÓN DE DISEÑO: ELIMINAR BLOQUEOS DE CAPA */
            /* Quitamos el div que envolvía todo para que Sanity use el 100% de la pantalla */
            
            /* 2. OCULTAR OPCIÓN "MANAGE PROJECT" Y OTROS ENLACES EXTERNOS */
            /* Usamos selectores más agresivos para alcanzar el menú desplegable (que está en un Portal) */
            a[href*="sanity.io/manage"],
            a[href*="/manage/project"],
            [data-testid="user-menu-item-manage-project"],
            button:has(span:contains("Manage project")),
            a:has(span:contains("Manage project")) {
              display: none !important;
              visibility: hidden !important;
              height: 0 !important;
              width: 0 !important;
              padding: 0 !important;
              margin: 0 !important;
              overflow: hidden !important;
            }

            /* 3. OCULTAR BOTONES INNECESARIOS DE LA BARRA SUPERIOR */
            [data-testid="search-button"],
            [data-testid="help-menu-button"],
            a[href*="vision"] { 
              display: none !important; 
            }
            
            /* 4. BLOQUEO DEL MENÚ DE PROYECTO (IZQUIERDA) */
            [data-testid="project-menu-button"] {
              pointer-events: none !important;
              cursor: default !important;
            }
            
            [data-testid="project-menu-button"] [data-slot="icon"] {
              display: none !important;
            }
          `),
          props.renderDefault(props)
        )
      },
    },
  },
})
