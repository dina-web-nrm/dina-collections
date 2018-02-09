import {
  BOOTSTRAP_UNREGISTER_MODULES,
  BOOTSTRAP_REGISTER_MODULES,
} from 'coreModules/bootstrap/actionTypes'
import {
  includesModule,
  registerModuleProperty,
  setModuleConfig,
  unregisterModuleProperty,
} from 'coreModules/bootstrap/utilities'

import { I18N_SET_LANGUAGE } from './actionTypes'

import { MARKDOWN, MODULE_NAME, TRANSLATIONS } from './constants'

export const initialState = {
  availableLanguages: ['en', 'sv'],
  defaultLanguage: 'en',
  language: 'en',
  markdown: {},
  translations: {},
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case BOOTSTRAP_REGISTER_MODULES: {
      let nextState = state
      if (includesModule(action, MODULE_NAME)) {
        nextState = setModuleConfig({
          action,
          moduleName: MODULE_NAME,
          state,
        })
      }

      nextState = registerModuleProperty({
        action,
        property: TRANSLATIONS,
        scopeUnderModules: true,
        state: nextState,
      })
      nextState = registerModuleProperty({
        action,
        property: MARKDOWN,
        scopeUnderModules: true,
        state: nextState,
      })

      return nextState
    }

    case BOOTSTRAP_UNREGISTER_MODULES: {
      const res = unregisterModuleProperty({
        action,
        property: TRANSLATIONS,
        scopeUnderModules: true,
        state,
      })
      return unregisterModuleProperty({
        action,
        property: MARKDOWN,
        scopeUnderModules: true,
        state: res,
      })
    }

    case I18N_SET_LANGUAGE: {
      return {
        ...state,
        language: action.payload,
      }
    }
    default: {
      return state
    }
  }
}
