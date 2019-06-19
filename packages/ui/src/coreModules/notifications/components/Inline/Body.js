import React from 'react'
import PropTypes from 'prop-types'
import { Grid } from 'semantic-ui-react'
import { UserManualLink } from 'coreModules/commonUi/components'
import { Translate } from 'coreModules/i18n/components'

const propTypes = {
  description: PropTypes.node,
  descriptionKey: PropTypes.string,
  displayLinkToUserManual: PropTypes.bool,
  linkTextKey: PropTypes.string,
  linkTo: PropTypes.string,
}
const defaultProps = {
  description: undefined,
  descriptionKey: undefined,
  displayLinkToUserManual: false,
  linkTextKey: undefined,
  linkTo: undefined,
}

const InlineNotificationBody = ({
  description,
  descriptionKey,
  linkTextKey,
  linkTo,
  displayLinkToUserManual,
}) => {
  return (
    <Grid padded>
      <Grid.Column>
        {description && description}
        {descriptionKey && (
          <p style={{ whiteSpace: 'pre-line' }}>
            <Translate capitalize textKey={descriptionKey} />
          </p>
        )}
        {displayLinkToUserManual && <UserManualLink />}
        {false && // temporary disable links
          linkTextKey &&
          linkTo && (
            <p key="link">
              <a href={linkTo} rel="noopener noreferrer" target="_blank">
                <Translate textKey={linkTextKey} />
              </a>
            </p>
          )}
      </Grid.Column>
    </Grid>
  )
}

InlineNotificationBody.propTypes = propTypes
InlineNotificationBody.defaultProps = defaultProps

export default InlineNotificationBody
