import React from 'react'
import PropTypes from 'prop-types'
import ModuleTranslate from './ModuleTranslate'

const propTypes = {
  textKey: PropTypes.string.isRequired,
}

export default function createModuleTranslate(moduleName, { scope = '' } = {}) {
  const ModuleTranslateWrapper = ({ ...rest }) => {
    return <ModuleTranslate scope={scope} {...rest} module={moduleName} />
  }
  ModuleTranslateWrapper.propTypes = propTypes
  return ModuleTranslateWrapper
}
