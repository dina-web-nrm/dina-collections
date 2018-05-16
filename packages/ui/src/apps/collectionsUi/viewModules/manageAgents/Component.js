import React, { Component } from 'react'
import PageTemplate from 'coreModules/commonUi/components/PageTemplate'
import { AgentManager } from 'domainModules/agent/components'

const defaultProps = {}

class ManageAgents extends Component {
  render() {
    return (
      <PageTemplate container={false}>
        <AgentManager />
      </PageTemplate>
    )
  }
}

ManageAgents.defaultProps = defaultProps

export default ManageAgents
