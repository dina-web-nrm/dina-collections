import React from 'react'
import PropTypes from 'prop-types'
import { Header } from 'semantic-ui-react'

import { ModuleTranslate } from 'coreModules/i18n/components'

const propTypes = {
  as: PropTypes.string,
  children: PropTypes.node,
  module: PropTypes.string.isRequired,
  textKey: PropTypes.string.isRequired,
}

const defaultProps = {
  as: 'h1',
  children: undefined,
}

const TranslatedHeader = ({ as, children, module, textKey }) => {
  return (
    <Header as={as}>
      <ModuleTranslate
        capitalize
        fallback={textKey}
        module={module}
        textKey={textKey}
      />
      {children}
    </Header>
  )
}

TranslatedHeader.propTypes = propTypes
TranslatedHeader.defaultProps = defaultProps

export default TranslatedHeader
