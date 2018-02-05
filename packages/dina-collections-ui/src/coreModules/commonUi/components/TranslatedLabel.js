import React from 'react'
import PropTypes from 'prop-types'
import { Label } from 'semantic-ui-react'

import { Translate } from 'coreModules/i18n/components'

const propTypes = {
  textKey: PropTypes.string.isRequired,
}

const TranslatedLabel = ({ textKey, ...rest }) => {
  return (
    <Label {...rest}>
      <Translate textKey={textKey} />
    </Label>
  )
}

TranslatedLabel.propTypes = propTypes

export default TranslatedLabel
