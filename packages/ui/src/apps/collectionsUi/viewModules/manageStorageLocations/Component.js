import React, { Component } from 'react'
import PageTemplate from 'coreModules/commonUi/components/PageTemplate'
import { StorageLocationManager } from 'domainModules/storage/components'

const defaultProps = {}

class ManageStorageLocations extends Component {
  render() {
    return (
      <PageTemplate container={false}>
        <StorageLocationManager />
      </PageTemplate>
    )
  }
}

ManageStorageLocations.defaultProps = defaultProps

export default ManageStorageLocations
