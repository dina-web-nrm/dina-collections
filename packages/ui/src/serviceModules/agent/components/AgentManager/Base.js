import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'

import { capitalizeFirstLetter } from 'common/src/stringFormatters'
import { actionCreators as crudActionCreators } from 'coreModules/crud'
import { ResourceManager } from 'coreModules/resourceManager/components'
import CreateForm from './item/CreateForm'
import EditForm from './item/EditForm'
import FilterForm from './filter/Form'
import buildFilterQuery from './filter/buildFilterQuery'
import transformOutput from './item/BaseForm/transformations/output'
import tableColumnSpecifications from './tableColumnSpecifications'
import ItemTitle from './ItemTitle'

const resource = 'normalizedAgent'
const include = ['resourceActivities']
const createGetNestedItemHocInput = {
  include,
  refresh: true,
  relationships: include,
  resolveRelationships: ['resourceActivity'],
  resource,
}

const relationshipsToCheckBeforeDelete = ['specimens']

const sortOrder = ['attributes.fullName:asc']

const buildEditItemHeaders = nestedItem => {
  if (!nestedItem) {
    return {}
  }

  return {
    itemHeader: nestedItem.fullName,
    itemSubHeader: capitalizeFirstLetter(nestedItem.agentType),
  }
}

const renderCreateForm = (props = {}) => {
  return <CreateForm {...props} />
}
const renderEditForm = (props = {}) => {
  return <EditForm {...props} />
}
const renderFilterForm = (props = {}) => {
  return <FilterForm {...props} />
}

const mapDispatchToProps = {
  getAgent: crudActionCreators.normalizedAgent.getOne,
}

const propTypes = {
  getAgent: PropTypes.func.isRequired,
  itemId: PropTypes.string,
  onNavigation: PropTypes.func.isRequired,
}

const defaultProps = {
  itemId: undefined,
}

class AgentManager extends Component {
  render() {
    return (
      <ResourceManager
        {...this.props}
        buildEditItemHeaders={buildEditItemHeaders}
        buildFilterQuery={buildFilterQuery}
        createGetNestedItemHocInput={createGetNestedItemHocInput}
        ItemTitle={ItemTitle}
        relationshipsToCheckBeforeDelete={relationshipsToCheckBeforeDelete}
        renderCreateForm={renderCreateForm}
        renderEditForm={renderEditForm}
        renderFilterForm={renderFilterForm}
        resource={resource}
        sortOrder={sortOrder}
        tableColumnSpecifications={tableColumnSpecifications}
        transformOutput={transformOutput}
        treeEnabled={false}
      />
    )
  }
}

AgentManager.propTypes = propTypes
AgentManager.defaultProps = defaultProps

export default compose(
  connect(
    undefined,
    mapDispatchToProps
  )
)(AgentManager)
