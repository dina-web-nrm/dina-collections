import React, { Component } from 'react'

import { CrudBlocksWrapper } from 'coreModules/crudBlocks/components'

import { DROPDOWN_FILTER_OPTIONS } from '../../constants'
import CreateForm from '../item/form/Create'
import EditForm from '../item/form/Edit'
import InspectView from '../item/Inspect'
import AgentList from '../collection/AgentList'

const propTypes = {}

class AgentManager extends Component {
  static renderCreateForm(props) {
    return <CreateForm {...props} />
  }

  static renderEditForm(props) {
    return <EditForm {...props} />
  }

  static renderInspectView(props) {
    return <InspectView {...props} />
  }

  static renderList(props) {
    return <AgentList {...props} />
  }

  render() {
    return (
      <CrudBlocksWrapper
        dropdownFilterOptions={DROPDOWN_FILTER_OPTIONS}
        itemIdParamName="agentId"
        name="agent"
        renderCreateForm={AgentManager.renderCreateForm}
        renderEditForm={AgentManager.renderEditForm}
        renderInspectView={AgentManager.renderInspectView}
        renderList={AgentManager.renderList}
        urlBasePath="/app/agents"
      />
    )
  }
}

AgentManager.propTypes = propTypes

export default AgentManager
