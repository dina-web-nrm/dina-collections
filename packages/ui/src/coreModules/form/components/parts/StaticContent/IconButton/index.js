import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { Button, Icon } from 'semantic-ui-react'

import { wrapInColumn } from 'coreModules/form/higherOrderComponents'
import { ModuleTranslate } from 'coreModules/i18n/components'

const propTypes = {
  icon: PropTypes.string,
  id: PropTypes.string,
  module: PropTypes.string,
  textKey: PropTypes.string.isRequired,
}
const defaultProps = {
  icon: undefined,
  id: undefined,
  module: 'collectionMammals',
}

function IconButton({ id, icon, module, textKey }) {
  return (
    <Button id={id} size="small">
      <Icon name={icon} />
      <ModuleTranslate capitalize module={module} textKey={textKey} />
    </Button>
  )
}

IconButton.propTypes = propTypes
IconButton.defaultProps = defaultProps

export default compose(wrapInColumn)(IconButton)
