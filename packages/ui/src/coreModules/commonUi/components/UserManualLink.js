import React from 'react'
import PropTypes from 'prop-types'
import { Icon } from 'semantic-ui-react'

const propTypes = {
  dataTestId: PropTypes.string,
  showIcon: PropTypes.bool,
  text: PropTypes.string,
}

const defaultProps = {
  dataTestId: 'userManualLink',
  showIcon: false,
  text: 'User manual',
}

const UserManualLink = ({ dataTestId, showIcon, text, ...rest }) => {
  return (
    <a
      {...rest}
      data-testid={dataTestId}
      href="/images/DINA Collections User Manual 2019 June 17.pdf"
      target="_blank"
    >
      {text}
      {showIcon && (
        <span>
          {' '}
          <Icon name="external" style={{ display: 'inline' }} />
        </span>
      )}
    </a>
  )
}
UserManualLink.propTypes = propTypes
UserManualLink.defaultProps = defaultProps

export default UserManualLink
