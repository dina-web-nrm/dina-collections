import React, { Component } from 'react'
import { StorageLocationManager } from 'domainModules/storage/components'

const defaultProps = {}

class ManageStorageLocations extends Component {
  render() {
    return <StorageLocationManager {...this.props} />
  }
}

ManageStorageLocations.defaultProps = defaultProps

export default ManageStorageLocations
