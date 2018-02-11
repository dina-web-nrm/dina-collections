import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Icon } from 'semantic-ui-react'

import globalSizeSelectors from 'coreModules/size/globalSelectors'
import createNotificationAC from 'coreModules/notifications/actionCreators/createNotification'

const mapStateToProps = state => {
  return {
    isLarge: globalSizeSelectors.getIsLarge(state),
  }
}
const mapDispatchToProps = { createNotification: createNotificationAC }

const propTypes = {
  createNotification: PropTypes.func.isRequired,
  helpNotificationProps: PropTypes.shape({
    description: PropTypes.node,
    descriptionHeaderKey: PropTypes.string,
    descriptionKey: PropTypes.string,
    headerKey: PropTypes.string,
    linkTextKey: PropTypes.string,
    linkTo: PropTypes.string,
    size: PropTypes.string,
  }).isRequired,
  isLarge: PropTypes.bool.isRequired,
}

export const FormFieldHelpIcon = ({
  createNotification,
  helpNotificationProps,
  isLarge,
}) => {
  return (
    <Icon
      color="blue"
      link
      name="help circle outline"
      onClick={() =>
        createNotification({
          componentProps: helpNotificationProps,
          displayType: isLarge ? 'inline' : 'fixed',
          type: 'HELP_TEXT',
        })
      }
    />
  )
}

FormFieldHelpIcon.propTypes = propTypes

export default connect(mapStateToProps, mapDispatchToProps)(FormFieldHelpIcon)
