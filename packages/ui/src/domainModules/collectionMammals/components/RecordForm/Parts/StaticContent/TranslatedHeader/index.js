import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { Header } from 'semantic-ui-react'

import { wrapInColumn } from 'coreModules/form/higherOrderComponents'
import { ModuleTranslate } from 'coreModules/i18n/components'

const propTypes = {
  as: PropTypes.string,
  module: PropTypes.string.isRequired,
  textKey: PropTypes.string.isRequired,
}
const defaultProps = {
  as: 'h1',
}

const TranslatedHeader = ({ as, module, textKey }) => {
  return (
    <Header as={as}>
      <ModuleTranslate
        capitalize
        fallback={textKey}
        module={module}
        textKey={textKey}
      />
    </Header>
  )
}

TranslatedHeader.propTypes = propTypes
TranslatedHeader.defaultProps = defaultProps

export default compose(wrapInColumn)(TranslatedHeader)
