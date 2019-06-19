import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  dataTestId: PropTypes.string,
  text: PropTypes.string,
}

const defaultProps = {
  dataTestId: 'userManualLink',
  text: 'User manual',
}

const UserManualLink = ({ dataTestId, text, ...rest }) => {
  return (
    <a
      {...rest}
      data-testid={dataTestId}
      href="/images/DINA Collections User Manual 2019 June 17.pdf"
      target="_blank"
    >
      {text}
    </a>
  )
}
UserManualLink.propTypes = propTypes
UserManualLink.defaultProps = defaultProps

export default UserManualLink
