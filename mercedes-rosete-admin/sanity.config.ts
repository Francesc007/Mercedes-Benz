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
            /* 1. OCULTAR OPCIONES EXTERNAS Y "MANAGE PROJECT" */
            /* Usamos selectores universales para alcanzar el menú aunque esté en capas flotantes */
            
            /* Ocultar el botón de búsqueda y ayuda en la barra superior */
            [data-testid="search-button"],
            [data-testid="help-menu-button"],
            a[href*="vision"] { 
              display: none !important; 
            }

            /* ESTRATEGIA: OCULTAR TODO EN EL MENÚ DE USUARIO EXCEPTO LO PERMITIDO */
            /* Intentamos ocultar el item de "Manage project" por múltiples vías */
            
            /* Por enlace */
            [role="menu"] a[href*="sanity.io/manage"],
            [role="menu"] a[href*="/manage/project"],
            /* Por test ID conocido */
            [data-testid="user-menu-item-manage-project"],
            /* Por selector de proximidad al texto (CSS Level 4 - :has) */
            [role="menuitem"]:has(span:contains("Manage")),
            [role="menuitem"]:has(div:contains("Manage")),
            /* Selector general para cualquier enlace de gestión */
            a[href*="manage.sanity.io"] {
              display: none !important;
              visibility: hidden !important;
              opacity: 0 !important;
              pointer-events: none !important;
            }

            /* 2. BLOQUEO DEL MENÚ DE PROYECTO (ARRIBA A LA IZQUIERDA) */
            /* Bloqueamos el clic para que no se abra el menú de la organización */
            [data-testid="project-menu-button"] {
              pointer-events: none !important;
              cursor: default !important;
            }
            
            /* Quitamos la flecha visual */
            [data-testid="project-menu-button"] [data-slot="icon"] {
              display: none !important;
            }

            /* 3. LIMPIEZA DE INTERFAZ */
            /* Aseguramos que no haya banners de invitación o gestión */
            [data-testid="project-invite-banner"] {
              display: none !important;
            }
          `),
          props.renderDefault(props)
        )
      },
    },
  },
})
