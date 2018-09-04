import React, { Component } from 'react'

import { AgentManager } from 'domainModules/agent/components'

const defaultProps = {}

class ManageAgents extends Component {
  render() {
    return <AgentManager {...this.props} treeEnabled={false} />
  }
}

ManageAgents.defaultProps = defaultProps

export default ManageAgents
