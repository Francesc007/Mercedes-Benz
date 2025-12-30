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
            /* 1. BLOQUEO TOTAL DE ACCESOS EXTERNOS (BARRA SUPERIOR) */
            
            /* Oculta el menú del nombre del proyecto (Arriba Izquierda) */
            /* Esto evita que vean la organización y el Manage Project de ese lado */
            [data-testid="project-menu-button"] { 
              display: none !important; 
            }

            /* Oculta el menú de usuario y perfil (Esquina Derecha) */
            /* Esta es la clave: si no hay botón, no hay menú con "Manage Project" */
            [data-testid="user-menu-button"] { 
              display: none !important; 
            }

            /* Oculta Ayuda, Búsqueda y Vision */
            [data-testid="help-menu-button"],
            [data-testid="search-button"],
            a[href*="vision"],
            button[aria-label="Vision"] { 
              display: none !important; 
            }

            /* 2. REFUERZO DE SEGURIDAD PARA MENÚS FLOTANTES */
            /* Por si Sanity intentara mostrar el enlace en otro lugar */
            [role="menuitem"] a[href*="sanity.io/manage"],
            [role="menuitem"]:has(svg[data-sanity-icon="cog"]),
            [data-testid="action-intent-manage-project"] {
              display: none !important;
            }

            /* 3. LIMPIEZA DE INTERFAZ */
            /* Eliminamos banners de invitación */
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