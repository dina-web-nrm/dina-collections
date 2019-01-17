import React from 'react'
import PropTypes from 'prop-types'

import { FormFieldHelpIcon } from 'coreModules/notifications/components'
import TranslatedHeader from '../TranslatedHeader'

const helpIconWrapperStyle = {
  display: 'inline-block',
  marginLeft: '0.25em',
}

const propTypes = {
  as: PropTypes.string,
  helpNotificationProps: PropTypes.shape({
    description: PropTypes.node,
    descriptionHeaderKey: PropTypes.string,
    descriptionKey: PropTypes.string,
    headerKey: PropTypes.string,
    linkTextKey: PropTypes.string,
    linkTo: PropTypes.string,
    size: PropTypes.string,
  }),
  module: PropTypes.string.isRequired,
  textKey: PropTypes.string.isRequired,
}

const defaultProps = {
  as: 'h1',
  helpNotificationProps: undefined,
}

const TranslatedHeaderWithHelpIcon = ({
  as,
  helpNotificationProps,
  module,
  textKey,
}) => {
  return (
    <TranslatedHeader as={as} module={module} textKey={textKey}>
      <div style={helpIconWrapperStyle}>
        {helpNotificationProps && (
          <FormFieldHelpIcon helpNotificationProps={helpNotificationProps} />
        )}
      </div>
    </TranslatedHeader>
  )
}

TranslatedHeaderWithHelpIcon.propTypes = propTypes
TranslatedHeaderWithHelpIcon.defaultProps = defaultProps

export default TranslatedHeaderWithHelpIcon
