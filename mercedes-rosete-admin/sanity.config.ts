import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {schemaTypes} from './schemaTypes'
import {createElement, Fragment} from 'react'

export default defineConfig({
  name: 'default',
  title: 'ALEX ROSETE | MBZ',

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
            /* 1. PERSONALIZACIÓN DEL LOGO LOCAL (MERCEDES-BENZ) */
            [data-testid="brand-logo"] {
              /* Usamos el logo local copiado a la carpeta static */
              background-image: url('/static/Logo MB1.jpg') !important;
              background-size: contain !important;
              background-repeat: no-repeat !important;
              background-position: center !important;
              width: 40px !important; /* Ajustado para el nuevo logo */
              height: 40px !important;
              color: transparent !important;
            }
            [data-testid="brand-logo"] svg {
              display: none !important;
            }

            /* 2. COLOR DE SELECCIÓN NEGRO TOTAL (FORZADO) */
            [data-testid="default-pane-item"][data-selected="true"],
            [data-testid="default-pane-item"][aria-selected="true"],
            [data-selected="true"],
            [data-state="selected"] { 
              background-color: #000000 !important; 
              --card-bg-color: #000000 !important;
              --card-accent-color: #000000 !important;
              --state-selected-color: #000000 !important;
            }
            
            [data-selected="true"] *, 
            [data-state="selected"] * {
              color: #ffffff !important;
              --card-fg-color: #ffffff !important;
              --state-selected-fg-color: #ffffff !important;
            }

            /* 3. PANEL DE EDICIÓN: FOCO EN GRIS SUTIL */
            input:focus, 
            textarea:focus, 
            select:focus,
            [data-ui="TextInput"]:focus-within,
            [data-ui="TextArea"]:focus-within {
              border-left: 4px solid #cccccc !important;
              box-shadow: none !important;
              transition: border-left 0.2s ease !important;
            }

            /* 4. CAMBIO DE COLOR "PUBLISHED" (DE VERDE A GRIS) */
            [data-ui="Badge"][data-tone="positive"],
            [data-ui="StatusBadge"][data-tone="positive"] {
              background-color: #eeeeee !important;
              color: #333333 !important;
              border: 1px solid #cccccc !important;
            }
            
            [data-ui="DocumentPaneHeader"] [data-tone="positive"] {
              background-color: #f5f5f5 !important;
              border-bottom: 1px solid #dddddd !important;
            }

            /* 5. ESTILO DE BOTONES Y TARJETAS */
            [data-testid="default-pane-item"] {
              transition: all 0.3s ease-in-out !important;
              border-radius: 6px !important;
            }
            [data-testid="default-pane-item"]:hover {
              transform: translateX(5px) !important;
              background-color: #f0f3f5 !important;
            }

            button[data-testid="publish-button"],
            button[data-ui="Button"] {
              border-radius: 20px !important;
              transition: all 0.2s ease !important;
            }

            /* 6. PROTECCIÓN Y SEGURIDAD (VITAL) */
            [data-testid="project-menu-button"],
            [data-testid="user-menu-button"],
            [data-testid="help-menu-button"],
            [data-testid="search-button"],
            a[href*="vision"],
            button[aria-label="Vision"],
            [data-testid="project-invite-banner"],
            [data-testid="action-intent-manage-project"] { 
              display: none !important; 
              visibility: hidden !important;
            }

            [role="menuitem"] a[href*="sanity.io/manage"],
            [role="menuitem"]:has(svg[data-sanity-icon="cog"]) {
              display: none !important;
            }
          `),
          props.renderDefault(props)
        )
      },
    },
  },
})
