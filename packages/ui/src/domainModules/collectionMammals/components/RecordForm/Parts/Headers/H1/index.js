import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { Header } from 'semantic-ui-react'

import { wrapInColumn } from 'coreModules/form/higherOrderComponents'
import { ModuleTranslate } from 'coreModules/i18n/components'

const propTypes = {
  module: PropTypes.string.isRequired,
  textKey: PropTypes.string.isRequired,
}

const H1 = ({ module, textKey }) => {
  return (
    <Header as="h1">
      <ModuleTranslate module={module} textKey={textKey} />
    </Header>
  )
}

H1.propTypes = propTypes

export default compose(wrapInColumn)(H1)
