import React, { Component } from 'react'
import PageTemplate from 'coreModules/commonUi/components/PageTemplate'
import { LocalityManager } from 'domainModules/locality/components'

const defaultProps = {}

class ManageLocalities extends Component {
  render() {
    return (
      <PageTemplate container={false}>
        <LocalityManager />
      </PageTemplate>
    )
  }
}

ManageLocalities.defaultProps = defaultProps

export default ManageLocalities
