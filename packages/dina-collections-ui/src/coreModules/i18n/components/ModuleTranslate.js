import React from 'react'
import PropTypes from 'prop-types'
import Translate from './Translate'
import { buildTextKeys } from '../utilities'

const propTypes = {
  module: PropTypes.string,
  modules: PropTypes.arrayOf(PropTypes.string),
  scope: PropTypes.string,
  textKey: PropTypes.string.isRequired,
}

const defaultProps = {
  module: '',
  modules: [],
  scope: '',
}

const ModuleTranslate = ({
  module: moduleInput,
  modules: modulesInput,
  textKey,
  scope,
  ...rest
}) => {
  const modules =
    modulesInput && modulesInput.length ? modulesInput : [moduleInput]
  const textKeys = buildTextKeys({ modules, scope, textKey })
  return <Translate textKeys={textKeys} {...rest} />
}

ModuleTranslate.propTypes = propTypes
ModuleTranslate.defaultProps = defaultProps

export default ModuleTranslate
