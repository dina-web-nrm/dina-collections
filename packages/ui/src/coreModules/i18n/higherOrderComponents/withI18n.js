import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  buildTextKeys,
  capitalizeFirstLetter,
  getTranslationByPath,
} from '../utilities'

export default function createWithI18n(
  { module: defaultModule = '', scope: defaultScope = '' } = {}
) {
  return function withI18n(ComposedComponent) {
    const contextTypes = {
      language: PropTypes.string.isRequired,
      translations: PropTypes.object.isRequired,
    }

    class WithI18n extends Component {
      constructor(props) {
        super(props)
        this.createModuleTranslate = this.createModuleTranslate.bind(this)
        this.moduleTranslate = this.moduleTranslate.bind(this)
        this.translate = this.translate.bind(this)
      }

      createModuleTranslate(moduleName, { scope = '' } = {}) {
        return ({ ...rest }) => {
          return this.moduleTranslate({ module: moduleName, scope, ...rest })
        }
      }

      moduleTranslate(
        {
          module: moduleInput = defaultModule,
          modules: modulesInput,
          textKey,
          scope = defaultScope,
          ...rest
        } = {}
      ) {
        const modules =
          modulesInput && modulesInput.length ? modulesInput : [moduleInput]
        const textKeys = buildTextKeys({ modules, scope, textKey })

        return this.translate({ textKeys, ...rest })
      }

      translate({ capitalize, fallback, params, textKey, textKeys }) {
        const { language, translations } = this.context
        const translation = getTranslationByPath(translations, {
          language,
          params,
          textKey,
          textKeys,
        })

        const output =
          capitalize && translation
            ? capitalizeFirstLetter(translation)
            : translation
        if (!output) {
          /* eslint-disable no-console */
          console.warn(
            `Translation not found for path: ${textKey}`,
            translations
          )
          /* eslint-enable no-console */
        }

        if (
          fallback &&
          (output === textKey ||
            (output &&
            textKeys &&
            textKeys[0] && // enough to check the first textKey
              output.indexOf(textKeys[0]) > -1))
        ) {
          return fallback
        }

        return output || textKey
      }

      render() {
        return (
          <ComposedComponent
            i18n={{
              createModuleTranslate: this.createModuleTranslate,
              moduleTranslate: this.moduleTranslate,
              translate: this.translate,
            }}
            {...this.props}
          />
        )
      }
    }

    WithI18n.contextTypes = contextTypes

    return WithI18n
  }
}
