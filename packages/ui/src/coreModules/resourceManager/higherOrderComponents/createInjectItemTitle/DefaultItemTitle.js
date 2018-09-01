import React, { Component } from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  nestedItem: PropTypes.object.isRequired,
}

class DefaultItemTitle extends Component {
  render() {
    const { nestedItem } = this.props
    return (
      <span>
        <span style={{ fontWeight: 'bold', marginRight: '0.5em' }}>
          {nestedItem.name}
        </span>
        {nestedItem.group && <span>({nestedItem.group})</span>}
      </span>
    )
  }
}

DefaultItemTitle.propTypes = propTypes

export default DefaultItemTitle
