import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Icon } from 'semantic-ui-react'

import layoutGlobalSelectors from 'coreModules/layout/globalSelectors'
import globalSizeSelectors from 'coreModules/size/globalSelectors'
import createNotificationAC from 'coreModules/notifications/actionCreators/createNotification'

const mapStateToProps = state => {
  return {
    applicationInModalLayer: layoutGlobalSelectors.getApplicationInModalLayer(
      state
    ),
    isLarge: globalSizeSelectors.getIsLarge(state),
  }
}
const mapDispatchToProps = { createNotification: createNotificationAC }

const propTypes = {
  applicationInModalLayer: PropTypes.bool.isRequired,
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
  applicationInModalLayer,
  createNotification,
  helpNotificationProps,
  isLarge,
}) => {
  let displayType = 'inline'
  if (applicationInModalLayer || !isLarge) {
    displayType = 'fixed'
  }
  return (
    <Icon
      color="blue"
      link
      name="help circle outline"
      onClick={event => {
        event.preventDefault()
        event.stopPropagation()
        createNotification({
          componentProps: helpNotificationProps,
          displayType,
          type: 'HELP_TEXT',
        })
      }}
    />
  )
}

FormFieldHelpIcon.propTypes = propTypes

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormFieldHelpIcon)
