import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  text: PropTypes.string,
}

const defaultProps = {
  text: 'User manual',
}

const UserManualLink = ({ text, ...rest }) => {
  return (
    <a
      {...rest}
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
