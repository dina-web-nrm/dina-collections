import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'semantic-ui-react'

import { ModuleTranslate } from 'coreModules/i18n/components'

const propTypes = {
  id: PropTypes.string,
  module: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  textKey: PropTypes.string.isRequired,
}
const defaultProps = {
  id: undefined,
  module: 'collectionMammals',
}

function AddButton({ id, onClick: handleClick, module, textKey }) {
  return (
    <Button
      basic
      className="shadowless"
      color="blue"
      id={id}
      onClick={handleClick}
    >
      + <ModuleTranslate capitalize module={module} textKey={textKey} />
    </Button>
  )
}

AddButton.propTypes = propTypes
AddButton.defaultProps = defaultProps

export default AddButton
