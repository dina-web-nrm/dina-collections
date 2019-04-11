import React, { Component } from 'react'
import { LocalityManager } from 'serviceModules/locality/components'

const defaultProps = {}

class ManageLocalities extends Component {
  render() {
    return <LocalityManager {...this.props} />
  }
}

ManageLocalities.defaultProps = defaultProps

export default ManageLocalities
