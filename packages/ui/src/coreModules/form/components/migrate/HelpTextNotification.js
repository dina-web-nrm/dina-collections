import React from 'react'
import PropTypes from 'prop-types'

import { Inline, Modal } from 'coreModules/notifications/components'

const propTypes = {
  displayType: PropTypes.oneOf(['fixed', 'inline']).isRequired,
}

function HelpTextNotification({ displayType, ...rest }) {
  if (displayType === 'fixed') {
    return <Modal displayLinkToUserManual {...rest} />
  }
  if (displayType === 'inline') {
    return <Inline displayLinkToUserManual {...rest} />
  }
  return null
}

HelpTextNotification.propTypes = propTypes

export default HelpTextNotification
