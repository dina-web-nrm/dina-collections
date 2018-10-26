import React from 'react'
import PropTypes from 'prop-types'
import { Button, Icon } from 'semantic-ui-react'

import { ModuleTranslate } from 'coreModules/i18n/components'

const propTypes = {
  icon: PropTypes.string,
  id: PropTypes.string,
  module: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  size: PropTypes.string,
  textKey: PropTypes.string.isRequired,
}
const defaultProps = {
  icon: undefined,
  id: undefined,
  size: undefined,
}

function IconButton({ id, icon, module, onClick: handleClick, size, textKey }) {
  return (
    <Button id={id} onClick={handleClick} size={size}>
      <Icon name={icon} />
      <ModuleTranslate capitalize module={module} textKey={textKey} />
    </Button>
  )
}

IconButton.propTypes = propTypes
IconButton.defaultProps = defaultProps

export default IconButton
